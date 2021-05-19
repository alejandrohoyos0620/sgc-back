const express = require('express');
const router = express.Router();
const passport = require('passport');
const DeviceService = require('../../services/devices');
const validation = require('../../utils/middlewares/validationHandlers');
const devicesSchemas = require('../../utils/schemas/devices');
const deviceService = new DeviceService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to create a service 
router.post('/',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(devicesSchemas.createSchema), //validate entry params
async function(req, res, next) {
    try{
        const confirm = await deviceService.create(req.body); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success',
            message: 'The device was created succesfully',
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

//router to get all devices of an owner/customer
router.get('/customerDevices',
passport.authenticate('jwt', {session: false}),
validation(devicesSchemas.ownerIdSchema, 'query'),
async function(req, res, next) {
    try{
        const customerServicesList= await deviceService.listByOwner(req.query.ownerId);
        res.status(200).json({
            status: 'success',
            devices: customerServicesList
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;