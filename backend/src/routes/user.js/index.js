const express = require('express')
const router = express.Router()
const { signup, signin, deleteUser, update, getAllUser, changePass, resetPass } = require('../../controllers/user.controller')
const checkAuth = require('../../middlewares/check-auth')
const createError = require('http-errors')
const {userValidation} = require('../../validations')
const validate = require('../../middlewares/validate')

router.post('/signin', validate(userValidation.createUser),signin)
router.post('/signup', validate(userValidation.createUser),signup)
router.post('/update', checkAuth, update)
router.delete('/delete/:id', checkAuth, deleteUser)
router.get('/list', checkAuth, getAllUser)
router.get('/get/:id',checkAuth, getAllUser)
router.post('/changePass', checkAuth, changePass)
router.post('/resetPass', checkAuth, resetPass)

router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
