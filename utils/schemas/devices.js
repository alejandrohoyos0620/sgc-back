const Joi = require('joi');
const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    brand: Joi.string().max(30).required(),
    code: Joi.string().max(40).required(),
    color: Joi.string().max(15)
});

const ownerIdSchema = Joi.object({
    ownerId: Joi.number().positive().required()
});

module.exports = {
    createSchema,
    ownerIdSchema
}
