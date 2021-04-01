const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const serviceSchemas = require('../../utils/schemas/services');
const servicesService = require('../../services/services');
const serviceService = new servicesService();

router.get('/establishmentServices',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.establishmentIdSchema, 'query'),
async function(req, res, next) {
    try{
        const servicesList = await serviceService.listByEstablishment(req.query.establishmentId);
        res.status(200).json({
            status: 'success',
            services: servicesList
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;