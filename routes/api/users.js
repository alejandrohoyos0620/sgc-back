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

//router to register an user
router.post('/register', 
validation(userSchema), //validate entry params
async function(req, res, next) {  
    if(!req.body.hasOwnProperty('role')){  //if doesn't exist an entry param called "role" we will register a customer
        try {
            const confirm = await customerService.register(req.body);  //call customer's service class method and save it's response
            res.status(200).json({  //response with status code 200 and json format
                status: "success",
                results: confirm
            });
        } catch(error) {
            next(error);
        }
    } else { //if exists an entry param called "role" we will register an employee
        try {
            delete req.body.city;  //city param is not neccesary for an employee
            const confirm = await employeeService.register(req.body);  //call employee's service class method and save it's response
            res.status(200).json({  //response with status code 200 and json format
                status: "success",
                results: confirm
            });
        } catch(error) {
            next(error);
        }
    }
    
});


//router to update basic user's information
router.put('/update', 
passport.authenticate('jwt', {session: false}),  //authenticate with JWT strategy
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
            updatedUser: newUser  //The updated user
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;