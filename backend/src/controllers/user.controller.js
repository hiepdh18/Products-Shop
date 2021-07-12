const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()

exports.signup = (req, res) => {
  const {name, email, password} = req.body 
  if(!name || !email || !password) throw createError.BadRequest()
  userModel.findOne({ email: email })
    .exec()
    .then(user => {
      if (user) {
        res.status(409).json({
          message: "Email exists!!!!!"
        })
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {
            const user = new userModel({
              _id: mongoose.Types.ObjectId(),
              name: name,
              email: email,
              password: hash
            })
            user.save()
              .then(result => {
                res.status(201).json({
                  message: "User created!!!"
                })
              })
              .catch(err => {
                res.status(500).json({
                  message: err
                })
              })
          }
        })
      }
    })
}

exports.deleteUser = (req, res, next) => {
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

exports.signin = (req, res, next) => {
  userModel.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          (err, result) => {
            if (err) {
              res.status(401).json({
                message: err
              })
            }
            if (result) {
              const token = jwt.sign(
                {
                  userId: user._id,
                  email: user.email
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h"
                }
              )
              res.status(200).json({
                message: "Auth successful!!!",
                token: token
              })
            } else {
              res.json({
                message: "Auth failed!!!"
              })
            }
          }
        )
      } else {
        res.status(409).json({
          message: "Auth failed!!!"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

exports.update = (req, res, next) => {
  userModel.findOneAndUpdate({ _id: req.body.id }, { fullname: req.body.fullname })
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
exports.getAllUser = (req, res) => {
  userModel.find()
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
exports.changePass = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err
      })
    } else {
      userModel.findOneAndUpdate({ _id: req.body.id }, { password : hash })
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
          res. json({
            message: err
          })
        })
    }
  })
}

exports.resetPass = (req, res) => {

  res.json('user')
}
