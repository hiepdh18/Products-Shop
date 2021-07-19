const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()

//  throw createError.BadRequest()
exports.checkUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userData.id).select('-password')
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'user not found!!' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "Internal server error!!!"
    })
  }
}

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body
  // Simple validation
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing email and/or password' })
  try {
    const user = await userModel.findOne({ email })
    if (user) return res
      .status(400)
      .json({ success: false, message: 'Email already taken' })
    // All good
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: 'failed to hass password' })
      } else {
        const user = new userModel({
          _id: mongoose.Types.ObjectId(),
          name,
          email,
          role,
          password: hash
        })
        await user.save()
        const accessToken = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role
          },
          process.env.JWT_KEY,
          {
            expiresIn: "10h"
          }
        )
        res.status(200).json({
          success: true,
          message: 'User created successfully!',
          accessToken
        })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

exports.deleteUser = async (req, res, next) => {
  userModel.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted!!!"
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

exports.signin = async (req, res, next) => {
  const { email, password } = req.body
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' })
  try {
    // Check for existing user
    const user = await userModel.findOne({ email })
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' })
    // Username found
    bcrypt.compare(
      password,
      user.password,
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, message: 'Incorrect username or password' })
        }
        // All good, return a token
        if (result) {
          const accessToken = jwt.sign(
            {
              id: user._id,
              email: user.email,
              role: user.role
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          )
          res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            accessToken
          })
        } else return res
          .status(400)
          .json({ success: false, message: 'Incorrect username or password' })
      }
    )

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

exports.updateUser = (req, res, next) => {
  userModel.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name, role: req.body.role })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "404 not found!!!"
        })
      }
    })
    .catch()
}
exports.getUsers = (req, res) => {
  userModel.find()
    .select('_id name')
    .exec()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
}
exports.getUser = async (req, res) => {
  userModel.findById(req.params.id)
    .select('_id name email role password')
    .exec()
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
}
exports.changePass = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else {
      userModel.findOneAndUpdate({ _id: req.params.id }, { password: hash })
        .exec()
        .then(user => {
          if (user) {
            res.status(200).json(user)
          } else {
            res.status(404).json({
              message: "404 not found!!!"
            })
          }
        })
        .catch(err => {
          res.json({
            message: err
          })
        })
    }
  })
}

exports.resetPass = (req, res) => {
  const newPass = "default.123"
  bcrypt.hash(newPass, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else {
      userModel.findOneAndUpdate({ _id: req.params.id }, { password: hash })
        .exec()
        .then(user => {
          if (user) {
            res.status(200).json({
              message: "reset successful!!!",
              password: newPass
            })
          } else {
            res.status(404).json({
              message: "404 not found!!!",
            })
          }
        })
        .catch(err => {
          res.json({
            message: err
          })
        })
    }
  })
}
