const Joi = require('joi');
const statusSchema = Joi.object({
    status: Joi.string().regex(/^approved|course|finished|notApproved$/).required(),
    establishmentId: Joi.number().required()
});

const statusWithRepairmanIdSchema = Joi.object({
    status: Joi.string().regex(/^approved|course|finished$/).required(),
    repairmanId: Joi.number().required()
});

const changeStatusSchema = Joi.object({
    status: Joi.string().regex(/^course|finished|rejected$/).required(),
    id: Joi.number().positive().required()
});

const approveSchema = Joi.object({
    id: Joi.number().required(),
    repairmanId: Joi.number().positive().require()
});
module.exports = {
    statusSchema,
    statusWithRepairmanIdSchema,
    changeStatusSchema,
    approveSchema
}