const express = require('express');
const {json, urlencoded} = require('body-parser');
const mongoose = require('mongoose');

const patientAPI = require('./routes/api/patient');
const biopsyAPI = require('./routes/api/biopsy');
const historyAPI = require('./routes/api/history');
const tumorAPI = require('./routes/api/tumor');

const app = express();

// povezivanje na bazu

app.use(json());

app.use('/api/patient', patientAPI);
app.use('/api/biopsy', biopsyAPI);
app.use('/api/history', historyAPI);
app.use('/api/history', tumorAPI);

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