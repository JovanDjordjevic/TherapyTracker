const mongoose = require('mongoose');

const therapySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numberOfCycels: {
        type: mongoose.Schema.Types.Number,
        require: true
    },
    therapyType: {
        type: mongoose.Schema.Types.String,
        require: true,
        enum: ["AC", "FAC", "EC"]
    },
    cycleDescription: {
        neoadjuvantChemotherapy: {
            type: mongoose.Schema.Types.String
        },
        herceptinTherapy: { //moguce promene
            type: mongoose.Schema.Types.String
        },
        comment: {
            type: mongoose.Schema.Types.String
        }
    },
    date: {
        type: mongoose.Schema.Types.Date
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "patients",
    }
});

const therapyModel = mongoose.model('therapy', therapySchema);

module.exports = therapyModel;