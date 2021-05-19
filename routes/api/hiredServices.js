const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const hiredServiceSchemas = require('../../utils/schemas/hiredServices');
const hiredServicesService = require('../../services/hiredServices');
const hiredServiceService = new hiredServicesService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get hired services from an establishment and a specific status
router.get('/establishmentServices', 
passport.authenticate('jwt', {session: false}),  //authenticate with JWT strategy
validation(hiredServiceSchemas.statusSchema, 'query'),  //validate entry params
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServiceService.listByEstablishmentAndStatus(req.query.establishmentId, req.query.status);  //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success',
            hiredServices: hiredServicesList
        });
    } catch(error) {
        next(error);
    }
});

//router to get all customer's hired services
router.get('/customerServices', 
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.customerIdSchema, 'query'),
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServiceService.listByCustomer(req.query.customerId);
        res.status(200).json({
            status: 'success',
            hiredServices: hiredServicesList
        });
    } catch(error) {
        next(error);
    }
});

//router to get all hired services which are assigned to a specific repairman
router.get('/repairmanServices',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.statusWithRepairmanIdSchema, 'query'),
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServiceService.listByRepairmanAndStatus(req.query.repairmanId, req.query.status);
        res.status(200).json({
            status: 'success',
            hiredServices: hiredServicesList
        });
    } catch(error) {
        next(error);
    }
});

//router to change the status of a hired service
router.put('/change',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.changeStatusSchema),
async function(req, res, next) {
    try{
        const results = await hiredServiceService.changeStatus(req.body.id, req.body.status);
        const changedHiredService = await hiredServiceService.getById(req.body.id);
        res.status(200).json({
            status: 'success',
            message: 'the hiredService status was changed',
            data: results,
            changedHiredService: changedHiredService
        });
    } catch(error) {
        next(error);
    }
});

//router to approve a specific hired service
router.put('/approve',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.approveSchema),
async function(req, res, next) {
    try{
        const results = await hiredServiceService.approve(req.body.id, req.body.repairmanId);
        res.status(200).json({
            status: 'success',
            message: 'The service was approved and assigned to a repairman',
            assingData: results[0],
            changeData: results[1],
            approvedHiredService: results[2]
        });
    } catch(error) {
        next(error);
    }
});

//router to create a hired service
router.post('/',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.createSchema),
async function(req, res, next) {
    try{
        const results = await hiredServiceService.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'The hiredService was created successfully',
            data: results[0],
            createdHiredServiceId: results[1]
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;