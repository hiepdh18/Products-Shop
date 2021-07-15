const mongoose = require('mongoose')
const util = require('util')
const multer = require('multer')

const { update } = require('../models/product.model')
const ProductModel = require('../models/product.model')

// config for upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    // dest: 'uploads/'
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

exports.uploadThumbnail = util.promisify(upload.single('thumbnail'))
exports.uploadSlide = util.promisify(upload.array('slide', 4))
exports.uploadFields = util.promisify(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'slide', maxCount: 5 }]))

exports.createProduct = async (req, res, next) => {
    const file = req.file
    let thumbnailUrl = file.path
    const product = new ProductModel({
        ...req.body,
        thumbnail: thumbnailUrl,
        _id: new mongoose.Types.ObjectId()
    })
    await product.save()
    res.json(product)
}

exports.getProducts = async (req, res, next) => {
    let page = req.params.page || 1
    let perPage = 10
    productModel.find()
        .select('_id name code category price')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(products => {
            if (products.length >= 0)
                res.status(200).json(products)
            else
                res.status(404).json("No entries!!!")
        })
        .catch(err => {

        })
}

exports.getProductsByCat = async (req, res, next) => {
    let page = req.params.page || 1
    let perPage = 10

    productModel.find({ category: req.body.category })
        .select('_id name code category price')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec()
        .then(products => {
            if (products.length >= 0)
                res.status(200).json(products)
            else
                res.status(404).json("No entries!!!")
        })
        .catch(err => {
            res.status(400).json("bad request!!!")
        })
}

exports.deleteProduct = async (req, res, next) => {
    try {
        await productModel.findOneAndDelete({ _id: req.params.id })
        res.json("thanh cong")
    } catch (error) {
        res.status(400).json("bad request!!!")
    }
}
exports.getProduct = async (req, res, next) => {
    const id = req.params.id
    productModel.findById(id)
        .then(product =>
            res.status(200).json(product)
        )
        .catch(err => {
            res.status(404).json('Not valid id!!!')
        })
}

exports.updateProduct = async (req, res) => {
    const files = req.files
    let thumbnailUrl
    let slideUrls = []

    if (files['thumbnail']) {
        thumbnailUrl = files['thumbnail'][0].path
    }
    if (files['slide']) {
        files['slide'].map(file => {
            slideUrls.push(file.path)
        })
    }
    try {
        if (thumbnailUrl)
            await productModel.findOneAndUpdate(
                { _id: req.params.id },
                {
                    ...req.body,
                    thumbnail: thumbnailUrl,
                    slide: slideUrls
                })
        else
            await productModel.findOneAndUpdate(
                { _id: req.params.id },
                {
                    ...req.body,
                    thumbnail: thumbnailUrl,
                    slide: slideUrls
                })
        res.json({
            message: "thanh cong"
        })
    } catch (error) {
        res.status(400).json({
            message: "loi"
        })
    }
}
