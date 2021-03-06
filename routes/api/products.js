const express = require('express');
const router = express.Router();
const passport = require('passport');
const ProductService = require('../../services/products');
const validation = require('../../utils/middlewares/validationHandlers');
const productsSchemas = require('../../utils/schemas/products');
const productsService = new ProductService();

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//router to get all products from an establishment
router.get('/filterByEstablishment',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(productsSchemas.filterByEstablishmentSchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const productsList = await productsService.listByEstablishment(req.query.establishmentId); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success', 
            products: productsList
        });
    } catch(error) {
        next(error);
    }
});

//router to get all enabled products from an establishment
router.get('/filterEnabledByEstablishment',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(productsSchemas.filterEnabledByEstablishmentSchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const productsList = await productsService.listEnabledByEstablishment(req.query.establishmentId, req.query.page ? req.query.page : 1); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success', 
            products: productsList
        });
    } catch(error) {
        next(error);
    }
});

//router to get all products from a category
router.get('/filterByCategory',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(productsSchemas.filterByCategorySchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const productsList = await productsService.listByCategory(req.query.categoryId); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success', 
            products: productsList
        });
    } catch(error) {
        next(error);
    }
});

//router to get all products from a category
router.get('/filterEnabledByCategory',
passport.authenticate('jwt', {session: false}), //authenticate with JWT strategy
validation(productsSchemas.filterEnabledByCategorySchema, 'query'), //validate entry params
async function(req, res, next) {
    try{
        const productsList = await productsService.listEnabledByCategory(req.query.categoryId, req.query.page ? req.query.page : 1); //call service class method and save it's response
        res.status(200).json({  //response with status code 200 and json format
            status: 'success', 
            products: productsList
        });
    } catch(error) {
        next(error);
    }
});

//router to get a product by id
router.get('/',
passport.authenticate('jwt', {session: false}),
validation(productsSchemas.readSchema, 'query'),
async function(req, res, next) {
    try{
        const product = await productsService.getById(req.query.id);
        res.status(200).json({
            status: 'success',
            product: product
        });
    } catch(error) {
        next(error);
    }
});

//router to create a product
router.post('/',
passport.authenticate('jwt', {session: false}),
validation(productsSchemas.createSchema),
async function(req, res, next) {
    try{
        const confirm = await productsService.create(req.body);
        res.status(200).json({
            status: 'success',
            message: "The product was created seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

//router to update a product
router.put('/',
passport.authenticate('jwt', {session: false}),
validation(productsSchemas.updateSchema),
async function(req, res, next) {
    try{
        const confirm = await productsService.update(req.body);
        res.status(200).json({
            status: 'success',
            message: "The product was updated seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

//router to delete a product
router.delete('/',
passport.authenticate('jwt', {session: false}),
validation(productsSchemas.deleteSchema, 'query'),
async function(req, res, next) {
    try{
        const confirm = await productsService.delete(req.query.id);
        res.status(200).json({
            status: 'success',
            message: "The product was deleted seccesfully",
            data: confirm
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;