const express = require('express');
const router = express.Router();
const { create, getAll, getOne,deleteOne, update } = require('../../controllers/type.controller')


router.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

router.post('/create', create);
router.get('/get/:id', getOne);
router.get('/getall', getAll);
router.post('/delete', deleteOne);
router.post('/update', update);

module.exports = router;