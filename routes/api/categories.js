const express = require('express');
const router = express.Router();
const passport = require('passport');
const CategoryService = require('../../services/categories');
const validation = require('../../utils/middlewares/validationHandlers');
const categoriesSchemas = require('../../utils/schemas/categories');
const categoryService = new CategoryService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get all categories from an establishment
router.get('/establishmentCategories',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(categoriesSchemas.establishmentIdSchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const categoriesList = await categoryService.listByEstablishment(req.query.establishmentId); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success',
            categories: categoriesList
        });
    } catch(error) {
        next(error);
    }
});

//router to get a category by id
router.get('/',
passport.authenticate('jwt', {session: false}),
validation(categoriesSchemas.readSchema, 'query'),
async function(req, res, next) {
    try{
        const category = await categoryService.getById(req.query.id);
        res.status(200).json({
            status: 'success',
            category: category
        });
    } catch(error) {
        next(error);
    }
});

//router to create a category
router.post('/',
passport.authenticate('jwt', {session: false}),
validation(categoriesSchemas.createSchema),
async function(req, res, next) {
    try{
        const confirm = await categoryService.create(req.body);
        res.status(200).json({
            status: 'success',
            message: "The category was created seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

//router to update a category
router.put('/',
passport.authenticate('jwt', {session: false}),
validation(categoriesSchemas.updateSchema),
async function(req, res, next) {
    try{
        const confirm = await categoryService.update(req.body);
        res.status(200).json({
            status: 'success',
            message: "The category was updated seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

//router to delete a category
router.delete('/',
passport.authenticate('jwt', {session: false}),
validation(categoriesSchemas.deleteSchema, 'query'),
async function(req, res, next) {
    try{
        const confirm = await categoryService.delete(req.query.id);
        res.status(200).json({
            status: 'success',
            message: "The category was deleted seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;