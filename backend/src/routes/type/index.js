const express = require('express')
const router = express.Router()
const { createType, getType, getTypes, updateType, deleteType } = require('../../controllers/type.controller')
const checkAuth = require('../../middlewares/checkAuth')
const createError = require('http-errors')
const checkRole = require('../../middlewares/checkRole')


router.get('/', getTypes)
router.get('/:id', getType)
router.post('/', checkAuth, checkRole, createType)
router.patch('/:id', checkAuth, checkRole, updateType)
router.delete('/:id', checkAuth, checkRole, deleteType)

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router 
