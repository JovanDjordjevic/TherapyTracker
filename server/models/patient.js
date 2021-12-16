const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    jmbg: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    parentName: {
        type: String,
        require: true,
    },
    surname: {
        type: String,
        require: true,
    },
    yearOfBirth: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
        maxlength: 1,
        enum: ['m', 'z'],
    },
    menopause: {
        type: Number,
        default: 0,
        max: 3,
        min: 0,
        require: true,
    },
    address: String,
    city: {
        type: String,
        require: true,
        default: "Beograd",
    },
    contact: {
        type: String,
        require: true,
    },
    email: String,
    tumorDateDiagnosis: {
        type: Date,
        require: true,
    },
    familyAnamnesis: {
        type: String,
        require: true,
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: "history",
    },
    
});

const patientsModel = mongoose.model('patients', patientsSchema);

module.exports = patientsModel;
