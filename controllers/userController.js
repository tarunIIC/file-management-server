const User = require('../models/User');
const schema = require('../validation/formValidation');
const SECRET_KEY = 'asdfghjkl@1234567890';

class UserController {
    static async register(req, res) {
        try {
            const { Name, Email, Password } = req.body;

            const { error } = schema.validate({ Name, Email, Password });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // if (User.findByEmail(Email)) {
            //     return res.status(400).json({ message: 'Email is already registered' });
            // }

            const { user, token } = await User.registerUser(Name, Email, Password);

            res.json({ message: 'User registered successfully', user, token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = UserController;
