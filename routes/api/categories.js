const express = require('express');
const router = express.Router();
const passport = require('passport');
const CategoryService = require('../../services/categories');
const validation = require('../../utils/middlewares/validationHandlers');
const categoriesSchemas = require('../../utils/schemas/categories');
const categoryService = new CategoryService();

router.get('/establishmentCategories',
passport.authenticate('jwt', {session: false}),
validation(categoriesSchemas.establishmentIdSchema, 'query'),
async function(req, res, next) {
    try{
        const categoriesList = await categoryService.listByEstablishment(req.query.establishmentId);
        res.status(200).json({
            status: 'success',
            categories: categoriesList
        });
    } catch(error) {
        next(error);
    }
});

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
        })
    } catch(error) {
        next(error);
    }
});

module.exports = router;