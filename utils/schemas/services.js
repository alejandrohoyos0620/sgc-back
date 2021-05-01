const Joi = require('joi');
const establishmentIdSchema = Joi.object({
    establishmentId: Joi.number().required()
});

const readSchema = Joi.object({
    id: Joi.number().required()
});

const toRequestSchema = Joi.object({
    establishmentId: Joi.number().positive().required(),
    type: Joi.string().regex(/^delivery|pickup$/).required()
});
const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    isDeliverable: Joi.number().min(0).max(1).required(),
    description: Joi.string().max(300).required(),
    price: Joi.number().required(),
    isEnable: Joi.number().min(0).max(1).required(),
    establishmentId: Joi.number().required()
});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().max(50).required(),
    isDeliverable: Joi.number().min(0).max(1).required(),
    description: Joi.string().max(300).required(),
    price: Joi.number().required(),
    isEnable: Joi.number().min(0).max(1).required(),
    establishmentId: Joi.number().required()
});

const deleteSchema = Joi.object({
    id: Joi.number().required()
});

module.exports = {
    establishmentIdSchema,
    createSchema,
    updateSchema,
    deleteSchema,
    readSchema,
    toRequestSchema
}

