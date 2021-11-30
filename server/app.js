const express = require('express');
const {json, urlencoded} = require('body-parser');
const mongoose = require('mongoose');
// require API-s ovde ....

const app = express();

// povezivanje na bazu

app.use(json());
// use ovde

app.use(function (req, res, next) {
    const error = new Error('Zahtev nije podrzan!');
    error.status = 405;

    next(error);
});

app.use(function(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack,
        }
    });
});

module.exports = app;