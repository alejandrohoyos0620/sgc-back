const Joi = require('joi');
const statusSchema = Joi.object({
    status: Joi.string().regex(/^approved|course|finished|notApproved$/).required()
});

const statusWithRepairmanIdSchema = Joi.object({
    status: Joi.string().regex(/^approved|course|finished|notApproved$/).required(),
    repairmanId: Joi.number().required()
});

const changeStatusSchema = Joi.object({
    status: Joi.string().regex(/^approved|course|finished|rejected$/).required(),
    id: Joi.number().required()
});
module.exports = {
    statusSchema,
    statusWithRepairmanIdSchema,
    changeStatusSchema
}