const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const serviceSchemas = require('../../utils/schemas/services');
const servicesService = require('../../services/services');
const serviceService = new servicesService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get all services from an establishment
router.get('/establishmentServices',
passport.authenticate('jwt', {session: false}),  //authenticate with JWT strategy
validation(serviceSchemas.establishmentIdSchema, 'query'),  //validate entry params
async function(req, res, next) {
    try{
        const servicesList = await serviceService.listByEstablishment(req.query.establishmentId);  //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success',
            services: servicesList
        });
    } catch(error) {
        next(error);
    }
});

//router to get delivery or pickup services to request
router.get('/toRequest',
passport.authenticate('jwt', {session: false}),
validation(serviceSchemas.toRequestSchema, 'query'),
async function(req, res, next) {
    try{
        const servicesList = await serviceService.listByEstablishmentAndType(req.query.establishmentId, req.query.type);
        res.status(200).json({
            status: 'success',
            services: servicesList
        });
    } catch(error) {
        next(error);
    }
});

//router to get an specific service
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

//router to create a service
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

//router to update a service
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

//router to delete a service
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
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;