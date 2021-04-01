const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const hiredServiceSchemas = require('../../utils/schemas/hiredServices');
const hiredServicesService = require('../../services/hiredServices');
const hiredServiceService = new hiredServicesService();
//JWT Strategy
require('../../utils/auth/strategies/jwt');

router.get('/establishmentServices', 
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.statusSchema, 'query'),
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServiceService.listByEstablishmentAndStatus(req.query.establishmentId, req.query.status);
        res.status(200).json({
            status: 'success',
            hiredServices: hiredServicesList
        });
    } catch(error) {
        next(error);
    }
});

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

module.exports = router;