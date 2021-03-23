const express = require('express');
const router = express.Router();
const CustomersService = require('../../services/customers');
const EmployeesService = require('../../services/employees');
const {userSchema} = require('../../utils/schemas/users');
const validation = require('../../utils/middlewares/validationHandlers');
const customerService = new CustomersService();
const employeeService = new EmployeesService();

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


module.exports = router;