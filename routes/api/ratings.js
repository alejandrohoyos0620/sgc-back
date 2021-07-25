const express = require('express');
const router = express.Router();
const passport = require('passport');
const RatingService = require('../../services/ratings');
const validation = require('../../utils/middlewares/validationHandlers');
const ratingsSchemas = require('../../utils/schemas/ratings');
const ratingService = new RatingService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get an specific rating
router.get('/',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(ratingsSchemas.readSchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const rating = await ratingService.getByHiredService(req.query.hiredServiceId); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success',
            rating: rating
        });
    } catch(error) {
        next(error);
    }
});

//router to create a rating
router.post('/',
passport.authenticate('jwt', {session: false}),
validation(ratingsSchemas.createSchema),
async function(req, res, next) {
    try{
        const confirm = await ratingService.create(req.body);
        res.status(200).json({
            status: 'success',
            message: "The rating was created seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;