const Joi = require('joi');
const filterByEstablishmentSchema = Joi.object({
    establishmentId: Joi.number().required()
});

const filterByCategorySchema = Joi.object({
    categoryId: Joi.number().required()
});

const readSchema = Joi.object({
    id: Joi.number().required()
});

const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    categoryId: Joi.number().required(),
    price: Joi.number().min(0).required(),
    brand: Joi.string().max(30).required(),
    image: Joi.string().max(300).required(),
    description: Joi.string().max(300).required(),
    code: Joi.string().max(40).required(),
    color: Joi.string().max(15).required(),
    establishmentId: Joi.number().required(),
    isEnable: Joi.number().min(0).max(1).required(),

});

const updateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().max(50).required(),
    categoryId: Joi.number().required(),
    price: Joi.number().min(0).required(),
    brand: Joi.string().max(30).required(),
    image: Joi.string().max(300).required(),
    description: Joi.string().max(300).required(),
    code: Joi.string().max(40).required(),
    color: Joi.string().max(15).required(),
    establishmentId: Joi.number().required(),
    isEnable: Joi.number().min(0).max(1).required(),
});

const deleteSchema = Joi.object({
    id: Joi.number().required()
});

module.exports = {
    readSchema,
    deleteSchema,
    createSchema,
    updateSchema,
    filterByEstablishmentSchema,
    filterByCategorySchema
}
