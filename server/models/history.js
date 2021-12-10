const mongoose = require('mongoose');
const {patientsSchema} = require('./patient');

const historySchema = new mongoose.Schema({
    index: {
        type: Number,
        require: true,
        unique: true,
    },
    date: {
        type: Date,
        require: true,
    },
    patient: {
        type: patientsSchema,
        require: true,
    },
});

const historyModel = mongoose.model('history', historySchema);

module.exports = historyModel;