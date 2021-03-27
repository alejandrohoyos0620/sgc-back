const Joi = require('joi');
const establishmentIdSchema = Joi.object({
    establishmentId: Joi.number().positive().required()
});

module.exports = {
    establishmentIdSchema
}
