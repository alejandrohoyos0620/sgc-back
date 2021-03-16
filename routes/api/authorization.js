const express = require('express');
const router = express.Router();
const AuthorizationService = require('../../services/authorization');
const authService = new AuthorizationService();

router.post('/', async function(req, res, next){
    try {
        const result = await authService.login(req.body);
        res.status(result[0]).json(result[1]);
    } catch(error) {
        next(error);
    }

});

module.exports = router;