const mongoose = require('mongoose');

const counterShema = new mongoose.Schema({
    historyIndexCounter: {
        type: mongoose.Schema.Types.Number,
        require: true,
        default: 1000
    },
    biopsyIndexCounter: {
        type: mongoose.Schema.Types.Number,
        require: true,
        default: 1000
    },
    tumorIndexCounter: {
        type: mongoose.Schema.Types.Number,
        require: true,
        default: 1000000
    }
});

const counterModel = mongoose.model('counter', counterShema);

module.exports = counterModel;