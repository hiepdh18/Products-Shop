const express = require('express');
const { create, getAll, deleteOne, getOne, update} = require('../../controllers/category.controller')

const router = express.Router();

router.post('/create', create);
router.get('/getall', getAll);
router.post('/delete', deleteOne);
router.get('/get/:id', getOne);
router.post('/update', update);

module.exports = router;