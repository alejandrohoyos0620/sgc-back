const Joi = require('joi');
const authSchema = Joi.object({
    email: Joi.string().regex(/^\w+@{1,1}\w+(\.{1,1}[a-zA-Z]+){1,2}$/).required(),
    password: Joi.string().min(8).max(15).required()
});

module.exports = {
    authSchema
}