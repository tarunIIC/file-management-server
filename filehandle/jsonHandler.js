const express = require('express');
const app = express()
const router = express.Router();
const schema = require('../validation/formValidation')

// const JSON_LIMIT = 10 * 1024 * 1024


router.post('/receive-json', (req, res) => {
    // const contentLength = parseInt(req.get('content-length') || '0');

    // if (contentLength > JSON_LIMIT) {
    //     console.log("Content exceeded limit")
    // }
    const jsonData = req.body;

    const { error, value } = schema.validate(jsonData)
    if (error) {
        console.log("error", error)
        console.log("error message", error.details[0].message)
    }
    else {
        console.log('Received JSON:', value);
    }
});

module.exports = router;
