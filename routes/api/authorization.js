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
        res.status(result[0]).json(result[1]);  //response with status code and json format
    } catch(error) {
        next(error);
    }
});

//recovery password router
router.post('/recoverPassword', 
validation(authenticationSchemas.recoverPasswordSchema, 'query'), //validate entry params
async function(req, res, next){
    try {
        const results = await authService.recoverPassword(req.query.email); //call service class method and save it's response
        res.status(results[0]).json({
            status: results[0] === 200 ? 'success' : 'failed',
            message: results[1]
        });  //response with status code and json format
    } catch(error) {
        next(error);
    }
});

//update password router (after receive a code)
router.post('/updatePassword', 
validation(authenticationSchemas.updatePasswordSchema), //validate entry params
async function(req, res, next){
    try {
        const results = await authService.updatePassword(req.body.email, req.body.code, req.body.newPassword); //call service class method and save it's response
        res.status(results[0]).json({
            status: results[0] === 200 ? 'success' : 'failed',
            message: results[1]
        });  //response with status code and json format
    } catch(error) {
        next(error);
    }
});

module.exports = router;