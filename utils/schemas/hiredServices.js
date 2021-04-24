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
    id: Joi.number().positive().required(),
    repairmanId: Joi.number().positive().required()
});

const createSchema = Joi.object({
    deviceId: Joi.number().positive().required(),
    customerId: Joi.number().positive().required(),
    serviceId: Joi.number().positive().required(),
    status: Joi.string().regex(/^notApproved$/),
    description: Joi.string().max(500).required(),
    date: Joi.string().regex(/^(\d{2,2}-?){2,2}\d{4,4}$/).required(),
    hour: Joi.string().required()
});

const customerIdSchema = Joi.object({
    customerId: Joi.number().positive().required()
});

module.exports = {
    statusSchema,
    statusWithRepairmanIdSchema,
    changeStatusSchema,
    approveSchema,
    createSchema,
    customerIdSchema
}