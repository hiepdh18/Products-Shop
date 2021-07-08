const typeModel = require('../models/type.model')
const mongoose = require('mongoose')

exports.create = async (req, res, next) => {
    const isExits = await typeModel.findOne({ name: req.body.name });
    if (isExits) throw new HttpException(400, 'Type has been exits!');
    var type = new typeModel({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.name
    })
    type.save();
    res.json(type)
}
exports.getOne = async (req, res, next) => {
    const id = req.params.id
    const type = await typeModel.findOne({_id : id })
    res.json(type)
}
exports.update = async (req, res, next) => {
    const id = req.body.id
    typeModel.findOneAndUpdate({_id : id},{...req.body})
        .exec()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log('loi')
        })

}
exports.deleteOne = async (req, res, next) => {
    await typeModel.findOneAndDelete({_id: req.body.id})
    res.json({message: "thanh cong"})
}
exports.getAll = async (req, res, next) => {
    const type = await typeModel.find({})
    res.json(type)
}
