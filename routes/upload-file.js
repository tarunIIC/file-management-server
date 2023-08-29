const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('../utils/aws-config');
const path = require('path');

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const extname = path.extname(file.originalname);
            const filename = `${Date.now()}${extname}`;
            const filepath = process.env.ASSETS_LOC + '/' + filename;
            cb(null, filepath);
        },
    }),
});

router.post('/', upload.single('file'), (req, res) => {
    console.log("req", req.file);
    res.json({ message: 'File uploaded successfully' });
});

module.exports = router;
