const express = require('express')
const { create, getAll, deleteOne, getOne, update } = require('../../controllers/category.controller')
const checkAuth = require('../../middlewares/check-auth')

const router = express.Router()

router.get('/get', getAll)
router.get('/get/:id', getOne)
router.post('/create', checkAuth, create)
router.post('/update', checkAuth, update)
router.delete('/delete', checkAuth, deleteOne)

router.get('/', (req, res) => {
    res.status(200).send('API for categories!!!')
});

module.exports = router
