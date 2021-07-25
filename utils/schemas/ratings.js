const Joi = require('joi');
const createSchema = Joi.object({
    score: Joi.number().positive().min(1).max(5).required(),
    commentary: Joi.string().max(200),
    hiredServiceId: Joi.number().positive().required()

});

const readSchema = Joi.object({
    hiredServiceId: Joi.number().positive().required()

});

module.exports = {
    createSchema,
    readSchema
}