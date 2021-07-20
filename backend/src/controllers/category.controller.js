const catModel = require('../models/category.model')
const mongoose = require('mongoose')
require('dotenv').config()

exports.createCategory = async (req, res, next) => {
    console.log(req.body)
    catModel.findOne({ name: req.body.name})
    .exec()
    .then(category => {
        if(!category) {
            var cat = new catModel({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                type: req.body.type
            })
            cat.save();
            res.json(cat)
        } else {
            res.status(409).json({
                success : false,
                message: "Product exist!!"
            })
        }
    })
    .catch(err => {
        res.status(400).json({
            message : err
        })
    })
}


exports.getCategoryByType = async (req, res) => {
    const cats = await catModel.find({type : req.params.id})
    res.json(cats)
}
exports.deleteCategory = async (req, res) => {
    try {
        await catModel.deleteOne({_id: req.params.id})
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
