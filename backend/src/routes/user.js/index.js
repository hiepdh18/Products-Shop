const express = require('express')
const router = express.Router()
const { signup, signin, deleteUser, update, getAllUser, changePass, resetPass, getSingleUser } = require('../../controllers/user.controller')
const checkAuth = require('../../middlewares/check-auth')
const createError = require('http-errors')
const {userValidation} = require('../../validations')
const validate = require('../../middlewares/validate')

router.get('/', checkAuth, getAllUser)

router.post('/signup', validate(userValidation.signup),signup)
router.post('/signin', validate(userValidation.signin),signin)

router.get('/:id',validate(userValidation.getAllUser),checkAuth, getSingleUser)
router.patch('/:id', validate(userValidation.update), checkAuth, update)
router.delete('/:id', validate(userValidation.deleteUser), checkAuth, deleteUser)
router.patch('/changePass/:id', validate(userValidation.changePass), checkAuth, changePass)
router.post('/resetPass/:id', checkAuth, resetPass)

router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
