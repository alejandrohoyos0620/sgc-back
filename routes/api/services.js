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

router.get('/',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.readSchema, 'query'),
async function(req, res, next) {
    try{
        const service = await serviceService.getById(req.query.id);
        res.status(200).json({
            status: 'success',
            service: service
        });
    } catch(error) {
        next(error);
    }
});

router.post('/',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.createSchema),
async function(req, res, next) {
    try{
        const confirm = await serviceService.create(req.body);
        res.status(200).json({
            status: 'success',
            message: "The service was created seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

router.put('/',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.updateSchema),
async function(req, res, next) {
    try{
        const confirm = await serviceService.update(req.body);
        res.status(200).json({
            status: 'success',
            message: "The service was updated seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

router.delete('/',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.deleteSchema, 'query'),
async function(req, res, next) {
    try{
        const confirm = await serviceService.delete(req.query.id);
        res.status(200).json({
            status: 'success',
            message: "The service was deleted seccesfully",
            data: confirm
        })
    } catch(error) {
        next(error);
    }
});

module.exports = router;