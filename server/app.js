const express = require('express');
const {json, urlencoded} = require('body-parser');
const mongoose = require('mongoose');
// require API-s ovde ....

const app = express();

// povezivanje na bazu

app.use(json());
// use ovde

module.exports = app;