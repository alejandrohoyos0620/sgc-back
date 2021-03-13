const express = require('express');
const router = express.Router();
const CustomersService = require('../../services/customers');
const customerService = new CustomersService();

router.post('/register', async function(req, res, next) {  
    try{
        const confirm = await customerService.registerCustomer(req.body);
        console.log(confirm);
        res.status(200).json({
            status: "success",
            results: confirm
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;