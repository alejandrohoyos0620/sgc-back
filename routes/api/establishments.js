const express = require('express');
const router = express.Router();
const passport = require('passport');
const EmployeeService = require('../../services/employees');
const validation = require('../../utils/middlewares/validationHandlers');
const establishmentsSchemas = require('../../utils/schemas/establishments');
const employeeService = new EmployeeService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

router.get('/repairmans',
passport.authenticate('jwt', {session: false}),
validation(establishmentsSchemas.availableRepairmansSchema, 'query'),
async function(req, res, next) {
    try {
        const repairmansList = await employeeService.listAvailablesRepairmansByEstablishment(req.query.establishmentId, req.query.date, req.query.hour);
        res.status(200).json({
            status: 'success',
            repairmans: repairmansList
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;