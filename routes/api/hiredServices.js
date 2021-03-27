const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const hiredServiceSchemas = require('../../utils/schemas/hiredServices');

//JWT Strategy
require('../../utils/auth/strategies/jwt');

router.get('/establishmentServices', 
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.statusSchema),
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServicesService.list(req.query.stablishmentId, req.query.status);
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
validation(hiredServiceSchemas.statusWithRepairmanIdSchema),
async function(req, res, next) {
    try{
        const hiredServicesList = await hiredServicesService.listByRepairmanId(req.query.repairmanId, req.query.status);
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
        const results = await hiredServicesService.changeStatus(req.body.id, req.body.newStatus);
        const changedHiredService = await hiredServicesService.getById(req.body.id);
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
        const results = await hiredServicesService.approve(req.body.id, req.body.repairmanId);
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