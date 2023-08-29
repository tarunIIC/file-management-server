const Joi = require('joi')

const schema = Joi.object({
    Name: Joi.string().min(3).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

module.exports = schema