const express = require('express')
const { createCategory, getCategories, deleteCategory, getCategory, update } = require('../../controllers/category.controller')
const checkAuth = require('../../middlewares/checkAuth')
const checkRole = require('../../middlewares/checkRole')
const router = express.Router()
const createError = require('http-errors')

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', checkAuth, checkRole, createCategory)
router.patch('/:id', checkAuth, checkRole, update)
router.delete('/:id', checkAuth, checkRole, deleteCategory)


router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
