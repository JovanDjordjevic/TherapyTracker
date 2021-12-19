const mongoose = require('mongoose');

const biopsySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: mongoose.Schema.Types.Date,
        require: true,
    },
    biopsySide: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    biopsyType: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    index: {
        type: mongoose.Schema.Types.Number,
        require: true,
        unique: true,
    },
    histotype: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    multifocality: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    comment: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "patients",
    }
});

const biopsyModel = mongoose.model('biopsy', biopsySchema);

module.exports = biopsyModel