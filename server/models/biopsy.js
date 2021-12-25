const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    biopsyTypeLeft: {
        type: mongoose.Schema.Types.String,
    },
    numLeft: {
        type: mongoose.Schema.Types.String,
    },
    histotypeLeft: {
        type: mongoose.Schema.Types.String,
    },
    multifocalityLeft: {
        type: mongoose.Schema.Types.String,
    },
    biopsyTypeRight: {
        type: mongoose.Schema.Types.String,
    },
    numRight: {
        type: mongoose.Schema.Types.String,
    },
    histotypeRight: {
        type: mongoose.Schema.Types.String,
    },
    multifocalityRight: {
        type: mongoose.Schema.Types.String,
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

biopsySchema.plugin(mongoosePaginate);

const biopsyModel = mongoose.model('biopsy', biopsySchema);

module.exports = biopsyModel