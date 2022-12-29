const express = require('express')


const app = express();
app.use(express.json());

//Routes Imports
const products = require('./routes/productRoute')
app.use('/api/v1', products);

//Middleware Errors
const errorMiddleware = require('./middleware/error') 
app.use(errorMiddleware)

module.exports = app