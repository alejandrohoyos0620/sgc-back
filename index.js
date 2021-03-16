const express = require('express');
const path = require('path');
const customersRouter = require('./routes/api/customers');
const authorizationRouter = require('./routes/api/authorization');
const cors = require('cors');

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
//server
const server = app.listen(3000, function() {
    console.log(`Listening in localhost:${server.address().port}`);
});