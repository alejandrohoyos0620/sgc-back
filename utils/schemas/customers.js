const Joi = require('joi');
const registerCustomerSchema = Joi.object({
    name: Joi.string().regex(/^\w+(\s{1,1}\w+){1,3}$/).max(100).required(),
    phone_number: Joi.string().regex(/^(\+|\-)?[0-9]{7,15}$/).required(),
    city: Joi.string().max(30).required(),
    address: Joi.string().max(50).required(),
    email: Joi.string().regex(/^\w+@{1,1}\w+(\.{1,1}[a-zA-Z]+){1,2}$/).required(),
    password: Joi.string().min(8).max(15).required()
});
module.exports = {
    registerCustomerSchema
}