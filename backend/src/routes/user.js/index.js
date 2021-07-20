const express = require('express')
const router = express.Router()

const {
    signout,
    signup,
    signin,
    deleteUser,
    updateUser,
    getUsers,
    changePass,
    resetPass,
    getUser,
    checkUser
} = require('../../controllers/user.controller')
const checkAuth = require('../../middlewares/checkAuth')
const checkRole = require('../../middlewares/checkRole')
const createError = require('http-errors')
const validate = require('../../middlewares/validate')
const { userValidation } = require('../../validations')

router.get('/signout', signout)
router.get('/check', checkAuth, checkUser)
router.get('/', validate(userValidation.getUsers), checkAuth, getUsers)
router.get('/:id', validate(userValidation.getUser), checkAuth, getUser)
router.post('/signin', validate(userValidation.signin), signin)
router.post('/signup', validate(userValidation.signup), signup)
router.patch('/:id', validate(userValidation.updateUser), checkAuth, checkRole, updateUser)
router.delete('/:id', validate(userValidation.deleteUser), checkAuth, checkRole, deleteUser)
router.post('/changePass/:id', validate(userValidation.changePass), checkAuth, changePass)
router.post('/resetPass/:id', validate(userValidation.resetPass), checkAuth, resetPass)

router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

router.use((req, res, next) => next(createError.NotFound()))

module.exports = router
