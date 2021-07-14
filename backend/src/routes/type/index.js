const express = require('express')
const router = express.Router()
const { create, getAll, getOne, deleteOne, update } = require('../../controllers/type.controller')
const checkAuth = require('../../middlewares/checkAuth')
const createError = require('http-errors')
const checkRole = require('../../middlewares/checkRole')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', checkAuth, checkRole, create)
router.patch('/:id', checkAuth, checkRole, update)
router.delete('/:id', checkAuth, checkRole, deleteOne)

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router 
