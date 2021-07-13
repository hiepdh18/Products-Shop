const express = require('express')
const { createCategory, getCategories, deleteCategory, getCategory, update } = require('../../controllers/category.controller')
const checkAuth = require('../../middlewares/check-auth')
const router = express.Router()
const createError = require('http-errors')

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', checkAuth, createCategory)
router.patch('/:id', checkAuth, update)
router.delete('/:id', checkAuth, deleteCategory)

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
