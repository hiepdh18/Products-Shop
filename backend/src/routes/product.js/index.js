const express = require('express')
const router = express.Router()
const { uploadFields, createProduct, getProducts, deleteProduct, getProduct, updateProduct } = require('../../controllers/product.controller')
const checkAuth = require('../../middlewares/checkAuth')
const checkRole = require('../../middlewares/checkRole')
const createError = require('http-errors')

router.get('/:page', getProducts)
router.get('/get-product/:id', getProduct)
router.post('/', checkAuth, checkRole, uploadFields, createProduct)
router.patch('/', checkAuth, checkRole, updateProduct)
router.delete('/:id', checkAuth, checkRole, deleteProduct)
router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
