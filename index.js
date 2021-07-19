const express = require('express');
const path = require('path');
const usersRouter = require('./routes/api/users');
const authorizationRouter = require('./routes/api/authorization');
const hiredServicesRouter = require('./routes/api/hiredServices');
const establishmentsRouter = require('./routes/api/establishments');
const servicesRouter = require('./routes/api/services');
const categoriesRouter = require('./routes/api/categories');
const devicesRouter = require('./routes/api/devices');
const productsRouter = require('./routes/api/products');

const cors = require('cors');
const {
    logErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorHandlers');

//CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

//app
const app = express();

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authorizationRouter);
app.use('/api/hiredServices', hiredServicesRouter);
app.use('/api/establishments', establishmentsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/devices', devicesRouter);
app.use('/api/products', productsRouter);

//error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//server
const server = app.listen(3000, function() {
    console.log(`Listening in localhost:${server.address().port}`);
});