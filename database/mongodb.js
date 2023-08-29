const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const databaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const User = mongoose.model('UserCollection', userSchema);

async function saveUser(name, email, password) {
    try {
        await mongoose.connect(process.env.MONGO_URI, databaseOptions);
        console.log('MongoDB Connected');

        const newUser = new User({
            name,
            email,
            password,
        });

        const savedUser = await newUser.save();

        console.log('User saved:', savedUser);

        return savedUser;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = saveUser
