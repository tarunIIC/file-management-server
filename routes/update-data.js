const express = require('express');
const router = express.Router();
const multer = require('multer');
const FileController = require('../controllers/fileController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const newFileName = `Test${Math.floor(Math.random()).toString()}${fileExtension}`;
        cb(null, newFileName);
    },
});
const up = multer({ storage });

router.post('/', up.fields([
    { name: 'image', maxCount: 1 },
    { name: 'largeFile', maxCount: 1 }]), FileController.updateData);

module.exports = router;
