'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');
const logger = require('./middlewares/logger.js');
const validator = require('./middleware/validator');

// Global Middleware
app.use(logger);
app.use(validator);

app.use(express.json());

app.get('/person',validator , (req, res)=> {
    res.status(200).json({
        name: req.query.name 
    })
});

function start(port) {
    app.listen(port, ()=>console.log(`Hello from ${port}`) )
}
app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
    app,
    start
}