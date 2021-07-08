const express = require('express')
const router = express.Router()
const { uploadFields,welcome, uploadThumbnail,uploadSlide,createProduct, getProducts, deleteProduct, getProduct, updateProduct} = require('../../controllers/product.controller')

router.get('/', welcome)
router.get('/get-products/:page', getProducts)
router.post('/create', uploadFields, createProduct)
router.post('/update', updateProduct)
router.post('/delete', deleteProduct)
router.get('/:productId', getProduct)

module.exports = router