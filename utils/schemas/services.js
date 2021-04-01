const Joi = require('joi');
const establishmentIdSchema = Joi.object({
    establishmentId: Joi.number().required()
});

module.exports = {
    establishmentIdSchema
}