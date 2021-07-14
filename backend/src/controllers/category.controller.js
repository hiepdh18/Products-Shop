const catModel = require('../models/category.model')
const mongoose = require('mongoose')
require('dotenv').config()

exports.createCategory = async (req, res, next) => {
    catModel.findOne({ name: req.body.name})
    .exec()
    .then(category => {
        if(!category) {
            var cat = new catModel({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                category: req.body.category
            })
            cat.save();
            res.json(cat)
        } else {
            res.status(409).json("loi")
        }
    })
    .catch(err => {
        res.status(400).json({
            message : err
        })

    })
}

exports.getCategory = async (req, res) => {
    const cat = await catModel.findOne({_id : req.params.id})
    res.json(cat)
}
exports.deleteCategory = async (req, res) => {
    try {
        await catModel.deleteOne({_id: req.params.id})
ep.dohoang.authenticate
        res.send('thanh cong');
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.getCategories = async (req, res) => {
    const list = await catModel.find()
    res.json(list)
}

exports.getCategoriesByType = async (req, res) => {
    const list = await catModel.find({category : req.body.type})
    res.json(list)
}

exports.update = async (req, res, next) => {
    const id = req.params.id
    catModel.findOneAndUpdate({ _id: id }, { ...req.body })
        .exec()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log('loi')
        })
}
