const express = require('express');
const userRoutes = require('./user.js/index.js')
const productRoutes = require('./product.js/index.js')
const categoryRoutes = require('./category.js/index.js')
const typeRoutes = require('./type/index.js')


const router = express.Router()

router.use('/type', typeRoutes)
router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/category', categoryRoutes)


router.get('/', (req, res) => {
    res.status(200).json('Welcome to our API!!! 🚀🚀🚀🚀')
});


module.exports = router;