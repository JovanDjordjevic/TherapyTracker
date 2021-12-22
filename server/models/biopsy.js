const mongoose = require('mongoose');

//date
// public side : BiopsySide,
//         public biopsyTypeLeft : BiopsyType,
//         public numLeft : string, 
//         public histotypeLeft : BiopsyHistotype,
//         public multifocalityLeft : string,
//         public biopsyTypeRight : BiopsyType,
//         public numRight : string,   
//         public histotypeRight : BiopsyHistotype,
//         public multifocalityRight : string,  
//         public comment : string,

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
    biopsyTypeRigt: {
        type: mongoose.Schema.Types.String,
    },
    numRigt: {
        type: mongoose.Schema.Types.String,
    },
    histotypeRigt: {
        type: mongoose.Schema.Types.String,
    },
    multifocalityRigt: {
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

const biopsyModel = mongoose.model('biopsy', biopsySchema);

module.exports = biopsyModel