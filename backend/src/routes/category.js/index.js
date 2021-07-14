const express = require('express')
const { create, getAll, deleteOne, getOne, update } = require('../../controllers/category.controller')
const checkAuth = require('../../middlewares/checkAuth')
const router = express.Router()
const createError = require('http-errors')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', checkAuth, create)
router.patch('/:id', checkAuth, update)
router.delete('/:id', checkAuth, deleteOne)

router.get('/', (req, res) => {
    res.status(200).send('API for categories!!!')
});
router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
