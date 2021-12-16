const mongoose = require('mongoose');

const biopsySchema = new mongoose.Schema({
    dateOfBiopsy: {
        type: Date,
        require: true,
    },
    biopsySide: {
        type: String,
        require: true,
    },
    biopsyType: {
        type: String,
        require: true,
    },
    index: {
        type: Number,
        require: true,
        unique: true,
    },
    date: {
        type: Date,
        require: true,
    },
    histotype: {
        type: String,
        require: true,
    },
    multifocality: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: "history",
    }
});

const biopsyModel = mongoose.model('biopsy', biopsySchema);

module.exports = biopsyModel