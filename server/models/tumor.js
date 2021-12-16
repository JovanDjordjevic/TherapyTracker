const mongoose = require('mongoose');

const tumorSchema = new mongoose.Schema({
    degree: {
        type: Number,
        require: true,
        enum: [0, 1, 2, 3]
    },
    ErScore: {
        type: Number,
        require: true,
    },
    ErPercentageScore: {
        type: Number,
        require: true,
        max: 100,
        min: 0
    },
    ErStatus: {
        type: Number,
        require: true,
        enum: [0, 1]
    },
    PgrScore: {
        type: Number,
        require: true,
    },
    PgrPercentageScore: {
        type: Number,
        require: true,
        max: 100,
        min: 0
    },
    PgrStatus: {
        type: Number,
        require: true,
        enum: [0, 1]
    },
    Her2INC: {
        type: Number,
        require: true,
    },
    Her2INCPercentage: {
        type: Number,
        require: true,
        max: 100,
        min: 0
    },
    Her2FISH_SICH: {
        type: String,
        require: true,
    },
    Her2Status: {
        type: Number,
        require: true,
        enum: [0, 1]
    }, 
    Ki67: { //moguce promene
        type: String,
        require: true,
    },
    molecularSubtype: {
        type: Number,
        require: true,
    },
    date: {
        type: Date
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: "history",
    }
});

const tumorModel = mongoose.model('tumor', tumorSchema);

module.exports = tumorModel;