const express = require('express');
const router = express.Router();
const AuthorizationService = require('../../services/authorization');
const authenticationSchemas = require('../../utils/schemas/authorization');
const validation = require('../../utils/middlewares/validationHandlers');
const authService = new AuthorizationService();

//login router
router.post('/', 
validation(authenticationSchemas.authSchema), //validate entry params
async function(req, res, next){
    try {
        const result = await authService.login(req.body); //call service class method and save it's response
        res.status(result[0]).json(result[1]);  //response with status code 200 and json format
    } catch(error) {
        next(error);
    }
});

module.exports = router;