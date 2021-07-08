const express = require('express');
const router = express.Router();
const { createUser, signin, deleteUser, update } = require('../../controllers/user.controller')


router.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
router.post('/signin',signin)
router.post('/signup', createUser);
router.get('/update', update);
router.delete('/delete/:id', deleteUser);
router.get('/list', createUser);
router.get('/changPass', createUser);
router.get('/resetPass', createUser);


module.exports = router;


// create
// update
// delete
// list
// change pass
// admin reset password
