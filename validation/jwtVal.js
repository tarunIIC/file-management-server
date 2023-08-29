const jwt = require('jsonwebtoken');
const SECRET_KEY = 'asdfghjkl@1234567890'

function verifyToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'JWT token not present.' });
    }

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid JWT token.' });
        }
        else {
            return res.status(200).json({ message: "Valid jwt token" })
        }
    });
}

module.exports = verifyToken;
