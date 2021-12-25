const mongoose = require('mongoose');

const therapySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    therapyType: {
        type: mongoose.Schema.Types.String,
        require: true,
        enum: ["AC", "FAC", "EC"]
    },
    isTherapyResponseSet: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    therapyResponse: {
        type: mongoose.Schema.Types.String,
    },
    numCycles: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    usingNeoadjuvant: { //moguce promene
        type: mongoose.Schema.Types.Boolean,
        require: true,
    },
    numTaxol: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    numTxtr: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    herceptinTherapy: {
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

const therapyModel = mongoose.model('therapy', therapySchema);

module.exports = therapyModel;