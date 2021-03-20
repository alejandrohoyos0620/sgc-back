const express = require('express');
const path = require('path');
const customersRouter = require('./routes/api/customers');
const authorizationRouter = require('./routes/api/authorization');
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
app.use('/api/customers', customersRouter);
app.use('/api/auth', authorizationRouter);

//error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
//server
const server = app.listen(3000, function() {
    console.log(`Listening in localhost:${server.address().port}`);
});