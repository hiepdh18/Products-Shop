const express = require('express')
const router = express.Router()
const { signup, signin, deleteUser, update, getAllUser, changePass, resetPass } = require('../../controllers/user.controller')
const checkAuth = require('../../middlewares/check-auth')
const createError = require('http-errors')

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/update', checkAuth, update)
router.delete('/delete/:id', checkAuth, deleteUser)
router.get('/list', checkAuth, getAllUser)
router.post('/changePass', checkAuth, changePass)
router.post('/resetPass', checkAuth, resetPass)

router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
