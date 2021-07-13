const express = require('express')
const router = express.Router()
const { create, getTypes, getType, deleteType, update } = require('../../controllers/type.controller')
checkAuth = require('../../middlewares/check-auth')
const createError = require('http-errors')

router.get('/', getTypes)
router.get('/:id', getType)
router.post('/', checkAuth, create)
router.patch('/:id', checkAuth, update)
router.delete('/:id', checkAuth, deleteType)

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
