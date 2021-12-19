const mongoose = require('mongoose');

const tumorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    degree: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1, 2, 3]
    },
    ErScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    ErPercentageScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
        max: 100,
        min: 0
    },
    ErStatus: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    },
    PgrScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    PgrPercentageScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
        max: 100,
        min: 0
    },
    PgrStatus: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    },
    Her2INC: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    Her2INCPercentage: {
        type: mongoose.Schema.Types.Number,
        require: true,
        max: 100,
        min: 0
    },
    Her2FISH_SICH: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    Her2Status: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    }, 
    Ki67: { //moguce promene
        type: mongoose.Schema.Types.String,
        require: true,
    },
    molecularSubtype: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    date: {
        type: mongoose.Schema.Types.Date,
        require: true,
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "patients",
    }
});

const tumorModel = mongoose.model('tumor', tumorSchema);

module.exports = tumorModel;