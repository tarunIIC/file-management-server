const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'asdfghjkl@1234567890';
const saveUser = require('../database/mongodb')

class User {
    // static users = [];

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async registerUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        // User.users.push(newUser);
        const savedUser = await saveUser(name, email, hashedPassword);
        const token = jwt.sign({ id: savedUser.id }, SECRET_KEY, { expiresIn: '1h' });
        return { user: savedUser, token };
    }
}

module.exports = User;
