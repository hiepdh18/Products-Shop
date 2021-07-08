const express = require('express')
const router = express.Router()
const { create, getAll, getOne, deleteOne, update } = require('../../controllers/type.controller')
checkAuth = require('../../middlewares/check-auth')

router.get('/get', getAll)
router.get('/get/:id', getOne)
router.post('/create', checkAuth, create)
router.post('/update', checkAuth, update)
router.delete('/delete', checkAuth, deleteOne)

router.get('/', (req, res) => {
    res.status(200).send('API for types!!!')
});

module.exports = router
