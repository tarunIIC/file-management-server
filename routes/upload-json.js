const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController');

router.post('/', FileController.uploadJson);

module.exports = router;
