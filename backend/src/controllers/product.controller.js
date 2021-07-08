const mongoose = require('mongoose')
const { update } = require('../models/product.model')
const productModel = require('../models/product.model')
const imageModel = require('../models/image.model')
const multer = require('multer')
const util = require('util')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage')
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
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})



exports.welcome = async (req, res, next) => {
    res.status(200).json({
        message: 'This is api for products!! 🚀🚀🚀'
    })
}
exports.uploadThumbnail = util.promisify(upload.single('thumbnail'))
exports.uploadSlide = util.promisify(upload.array('slide', 5))
exports.uploadFields = util.promisify(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'slide', maxCount: 5 }]))

exports.createProduct = async (req, res, next) => {
    const files = req.files
    // console.log(files)

    let slideIds = []
    const thumbnail = new imageModel({
        _id: new mongoose.Types.ObjectId(),
        name: files['thumbnail'].filename,
        path: files['thumbnail'].path
    })
    const tn = await thumbnail.save()
    const thumbnailId = tn._id
    await Promise.all(
        files['slide'].map(file => {
            const image = new imageModel({
                _id: new mongoose.Types.ObjectId(),
                name: files.filename,
                path: file.path
            })
            image.save()
            slideIds.push(image._id)
        })
    )

    const product = new productModel({
        ...req.body,
        thumbnail: thumbnail._id,
        _id: new mongoose.Types.ObjectId(),
        slide: slideIds
    })
    await product.save()
    res.json(product)
}
exports.getProducts = async (req, res, next) => {
    let page = req.params.page || 1
    let perPage = 10

    productModel.find()
        .populate('thumbnail')
        // .select('_id name code price')
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
exports.deleteProduct = async (req, res, next) => {
    await productModel.findOneAndDelete({ _id: req.body.id })
    res.json("thanh cong")
}
exports.getProduct = (req, res, next) => {
    const id = req.params.id
    productModel.findById(id)
        .then(product =>
            res.status(200).json(product)
        )
        .catch(err => {
            res.status(404).json('Not valid id!!!')
        })
}
exports.updateProduct = (req, res) => {
    const id = req.body.productId
    productModel.findOneAndUpdate({ _id: id }, { name: req.body.name, price: req.body.price })
        .exec()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log('loi')
        })
}
