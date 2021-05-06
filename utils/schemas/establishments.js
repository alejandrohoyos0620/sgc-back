const Joi = require('joi');
const availableRepairmansSchema = Joi.object({
    establishmentId: Joi.number().positive().required(),
    date: Joi.string().regex(/^\d{4,4}(-{1,1}\d{2,2}){2,2}/).required(),
    hour: Joi.string().regex(/^(\d{2,2}:){2,2}\d{2,2}$/).required()
});

module.exports = {
    availableRepairmansSchema
}
