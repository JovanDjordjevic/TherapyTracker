const express = require('express');
const {json, urlencoded} = require('body-parser');
const mongoose = require('mongoose');
// require API-s ovde ....

const app = express();

const databaseString = 'mongodb://localhost:27017/patients';

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
// use ovde

module.exports = app;