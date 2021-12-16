const mongoose = require('mongoose');

const therapySchema = new mongoose.Schema({
    numberOfCycels: {
        type: Number,
        require: true
    },
    therapyType: {
        type: String,
        require: true,
        enum: ["AC", "FAC", "EC"]
    },
    cycleDescription: {
        neoadjuvantChemotherapy: {
            type: String
        },
        herceptinTherapy: { //moguce promene
            type: String
        },
        comment: {
            type: String
        }
    },
    date: {
        type: Date
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: "history",
    }
});

const therapyModel = mongoose.model('therapy', therapySchema);

module.exports = therapyModel;