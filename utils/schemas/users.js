const Joi = require('joi');
const userSchema = Joi.object({
    sub: Joi.string().regex(/^(\w|ñ|Ñ|á|é|í|ó|ú)+(\s{1,1}(\w|ñ|Ñ|á|é|í|ó|ú)+){1,3}$/).max(100).required(),
    phone: Joi.string().regex(/^(\+|\-)?[0-9]{7,15}$/).required(),
    city: Joi.string().max(30),
    address: Joi.string().max(50).required(),
    email: Joi.string().regex(/^\w+(\.{1,1}\w+)*@{1,1}\w+(\.{1,1}[a-zA-Z]+){1,2}$/).required(),
    password: Joi.string().regex(/^(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).min(8).max(15).required(),
    role: Joi.string().regex(/^repairman|administrator$/),
    establishmentId: Joi.number().positive()
});
const userUpdateSchema = Joi.object({
    id: Joi.number().positive().required(),
    sub: Joi.string().regex(/^(\w|ñ|Ñ|á|é|í|ó|ú)+(\s{1,1}(\w|ñ|Ñ|á|é|í|ó|ú)+){1,3}$/).max(100).required(),
    phone: Joi.string().regex(/^(\+|\-)?[0-9]{7,15}$/).required(),
    city: Joi.string().max(30),
    address: Joi.string().max(50).required(),
    email: Joi.string().regex(/^\w+(\.{1,1}\w+)*@{1,1}\w+(\.{1,1}[a-zA-Z]+){1,2}$/).required(),
    role: Joi.string().regex(/^repairman|administrator$/),
    establishmentId: Joi.number().positive()
});
module.exports = {
    userSchema,
    userUpdateSchema
}