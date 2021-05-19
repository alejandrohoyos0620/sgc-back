const express = require('express');
const router = express.Router();
const passport = require('passport');
const EmployeeService = require('../../services/employees');
const validation = require('../../utils/middlewares/validationHandlers');
const establishmentsSchemas = require('../../utils/schemas/establishments');
const employeeService = new EmployeeService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get all available establishment's repairmans
router.get('/repairmans',
passport.authenticate('jwt', {session: false}),  //authenticate with JWT strategy
validation(establishmentsSchemas.availableRepairmansSchema, 'query'),  //validate entry params
async function(req, res, next) {
    try {
        const repairmansList = await employeeService.listAvailablesRepairmansByEstablishment(req.query.establishmentId, req.query.date, req.query.hour); //call service class method and save it's response
        res.status(200).json({ //response with status code 200 and json format
            status: 'success',
            repairmans: repairmansList
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;