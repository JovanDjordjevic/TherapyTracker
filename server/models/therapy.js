const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    date: {
        type: mongoose.Schema.Types.Date,
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

therapySchema.plugin(mongoosePaginate);

const therapyModel = mongoose.model('therapy', therapySchema);

module.exports = therapyModel;