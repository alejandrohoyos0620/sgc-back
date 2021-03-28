const express = require('express');
const router = express.Router();
const CustomersService = require('../../services/customers');
const EmployeesService = require('../../services/employees');
const {userSchema, userUpdateSchema} = require('../../utils/schemas/users');
const validation = require('../../utils/middlewares/validationHandlers');
const passport = require('passport');
const customerService = new CustomersService();
const employeeService = new EmployeesService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

router.post('/register', 
validation(userSchema), 
async function(req, res, next) {  
    if(!req.body.hasOwnProperty('role')){
        try {
            const confirm = await customerService.register(req.body);
            console.log(confirm);
            res.status(200).json({
                status: "success",
                results: confirm
            });
        } catch(error) {
            next(error);
        }
    } else {
        try {
            delete req.body.city;
            const confirm = await employeeService.register(req.body);
            console.log(confirm);
            res.status(200).json({
                status: "success",
                results: confirm
            });
        } catch(error) {
            next(error);
        }
    }
    
});

router.put('/update', 
passport.authenticate('jwt', {session: false}),
validation(userUpdateSchema),
async function(req, res, next) {
    let confirm;
    let newUser;
    try{
        if(req.body.hasOwnProperty('role')) {
            confirm = await employeeService.update(req.body);
            newUser = await employeeService.getById(req.body.id);
        } else {
            confirm = await customerService.update(req.body);
            newUser = await customerService.getById(req.body.id);
        }
        res.status(200).json({
            status: 'success',
            message: 'The user was updated',
            data: confirm,
            updatedUser: newUser
        });
    } catch(error) {
        next(error);
    }
})

module.exports = router;