const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const tumorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: mongoose.Schema.Types.Date,
        require: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    biopsyIndex: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    gradus: {
        type: mongoose.Schema.Types.String,
        require: true,
        enum: ["1", "2", "3", "Nepoznato"]
    },
    erScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    erPercentageScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    erStatus: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    },
    egrScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    pgrPercentageScore: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    pgrStatus: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    },
    her2INC: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    her2INCPercentage: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    her2_FISH_SICH: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    her2Status: {
        type: mongoose.Schema.Types.Number,
        require: true,
        enum: [0, 1]
    }, 
    ki67: { //moguce promene
        type: mongoose.Schema.Types.String,
        require: true,
    },
    molecularSubtype: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "patients",
    }
});

tumorSchema.plugin(mongoosePaginate);

const tumorModel = mongoose.model('tumor', tumorSchema);

module.exports = tumorModel;