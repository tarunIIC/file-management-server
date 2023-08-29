const express = require('express');
const router = express.Router();
const { uploadJson } = require('../controllers/fileController');

router.post('/', uploadJson);

module.exports = router;
