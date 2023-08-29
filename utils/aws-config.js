const AWS = require('aws-sdk')
require('dotenv').config()

const awsConfig = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
};

AWS.config.update(awsConfig);

module.exports = AWS;