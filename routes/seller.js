const express = require('express');
let router = express.Router();
const {getAllSellers, getByName, saveSeller} = require('../controllers/seller');

router.get('/', getAllSellers);
router.get('/:name', getByName);
router.post('/', saveSeller);

module.exports = router;