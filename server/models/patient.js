const mongoose = require('mongoose');

const patientsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    //Pol (m ili z vrednost, bira se preko radio dugmica)
    gender: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
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
    //veca niska
    familyAnamnesis: {
        type: String,
        require: true,
    },
    
});

const patientsModel = mongoose.model('patients', patientsSchema);

module.exports = patientsModel;