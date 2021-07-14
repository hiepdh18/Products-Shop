const catModel = require('../models/category.model')
const mongoose = require('mongoose')
require('dotenv').config()

exports.create = async (req, res) => {
    const isExits = await catModel.findOne({ name: req.body.name });

    if (isExits) throw new HttpException(400, 'Category has been exits!');
    var cat = new catModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category
    })
    cat.save();
    res.json(cat)
}

exports.getAll = async (req, res) => {
    const list = await catModel.find()
    console.log(process.env.PORT)
    res.json(list)
}
exports.deleteOne = async (req, res) => {
    try {
        await catModel.deleteOne({ _id: req.body.id })
        res.send('thanh cong');
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.getOne = async (req, res) => {
    const list = await catModel.find()
    res.json(list)
}
exports.update = async (req, res, next) => {
    const id = req.body.id
    catModel.findOneAndUpdate({ _id: id }, { ...req.body })
        .exec()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log('loi')
        })

}
