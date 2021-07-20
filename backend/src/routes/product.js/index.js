const express = require('express')
const router = express.Router()
const { uploadFields, uploadThumbnail, getProductsByCat,createProduct, getProducts, deleteProduct, getProduct, updateProduct } = require('../../controllers/product.controller')
const checkAuth = require('../../middlewares/checkAuth')
const checkRole = require('../../middlewares/checkRole')
const createError = require('http-errors')

router.get('/', getProductsByCat)
router.get('/:page', getProducts)
router.get('/get-product/:id', getProduct)
router.post('/', checkAuth, checkRole, uploadThumbnail, createProduct)
router.patch('/:id', checkAuth, checkRole,uploadFields, updateProduct)
router.delete('/:id', checkAuth, checkRole, deleteProduct)
router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
