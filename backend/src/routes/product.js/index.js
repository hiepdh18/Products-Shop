const express = require('express')
const router = express.Router()
const { uploadFields, welcome, createProduct, getProducts, deleteProduct, getProduct, updateProduct } = require('../../controllers/product.controller')
checkAuth = require('../../middlewares/check-auth')
const createError = require('http-errors')

router.get('/get/:page', getProducts)
router.get('/getone/:id', getProduct)
router.post('/create', checkAuth, uploadFields, createProduct)
router.post('/update', checkAuth, updateProduct)
router.delete('/delete', checkAuth, deleteProduct)
router.get('/', welcome)
router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
