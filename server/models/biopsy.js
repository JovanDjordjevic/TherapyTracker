const mongoose = require('mongoose');

const biopsySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        require: true,
    },
    side: {
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
    }
});

const biopsyModel = mongoose.model('biopsy', biopsySchema);

module.exports = biopsyModel