const express = require('express');
const router = express.Router();
const verifyToken = require('../validation/jwtVal');

router.get('/', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route.', user: req.user });
});

module.exports = router;
