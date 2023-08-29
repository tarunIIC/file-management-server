const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const express = require('express');
const app = express();
const cors = require('cors');
const jsonHandler = require('./filehandle/jsonHandler');
const registerRoute = require('./routes/register');
const uploadRoute = require('./routes/upload-file');
const uploadJsonRoute = require('./routes/upload-json');
const updateDataRoute = require('./routes/update-data');
const protectedRoute = require('./routes/protected');

app.use(cors());
const port = 3000;

// Middleware
// Todo: Handle error message of PayloadTooLargeError: request entity too large
app.use(express.json({ limit: '10kb' }));
app.use(jsonHandler);

//routes
app.use('/upload', uploadRoute);
app.use('/upload-json', uploadJsonRoute);
app.use('/update-data', updateDataRoute);
app.use('/protected', protectedRoute);
app.use('/register', registerRoute)

app.use((err, req, res) => {
    console.error(err)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
