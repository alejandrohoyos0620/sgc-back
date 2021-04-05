const Joi = require('joi');
const establishmentIdSchema = Joi.object({
    establishmentId: Joi.number().required()
});

const readSchema = Joi.object({
    id: Joi.number().required()
});

const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    establishmentId: Joi.number().required()
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().max(50).required(),
    establishmentId: Joi.number().required()
});

const deleteSchema = Joi.object({
    id: Joi.number().required()
});

module.exports = {
    readSchema,
    deleteSchema,
    createSchema,
    updateSchema,
    establishmentIdSchema
}
