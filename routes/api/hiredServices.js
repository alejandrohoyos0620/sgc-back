const express = require('express');
const router = express.Router();
const passport = require('passport');
const validation = require('../../utils/middlewares/validationHandlers');
const hiredServiceSchemas = require('../../utils/schemas/hiredServices');

//JWT Strategy
require('../../utils/auth/strategies/jwt');

router.get('/', 
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.statusSchema),
async function(req, res, next) {
    try{
        const confirm = await hiredServicesService.list(req.query.status);
        res.status(200).json({
            status: 'success'});
    } catch(error) {
        next(error);
    }
});

router.get('/',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.statusWithRepairmanIdSchema),
async function(req, res, next) {
    try{
        const confirm = await hiredServicesService.listByRepairmanId(req.query.status);
        res.status(200).json({
            status: 'success'});
    } catch(error) {
        next(error);
    }
});
router.put('/',
passport.authenticate('jwt', {session: false}),
validation(hiredServiceSchemas.changeStatusSchema),
async function(req, res, next) {
    try{
        const confirm = await hiredServicesService.changeStatus(req.body);
        res.status(200).json({
            status: 'success'});
    } catch(error) {
        next(error);
    }
});

module.exports = router;