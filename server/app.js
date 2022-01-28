const express = require('express');
const {json, urlencoded} = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const patientAPI = require('./routes/api/patient');
const biopsyAPI = require('./routes/api/biopsy');
const tumorAPI = require('./routes/api/tumor');
const therapyAPI = require('./routes/api/therapy');

const app = express();

const address = process.env.DB_ADDRESS || 'localhost';
const databaseString = 'mongodb://' + address + ':27017/TherapyTracker';
// console.log(databaseString)

mongoose.connect(databaseString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Connection successful!');
});

mongoose.connection.on('error', (error) => {
  console.log('Error: ', error);
});

app.use(json());

app.use(cors());

app.use('/api/patient', patientAPI);
app.use('/api/biopsy', biopsyAPI);
app.use('/api/tumor', tumorAPI);
app.use('/api/therapy', therapyAPI);

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