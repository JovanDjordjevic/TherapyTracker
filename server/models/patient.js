const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const patientsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jmbg: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    parentName: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    surname: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    yearOfBirth: {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    gender: {
        type: mongoose.Schema.Types.String,
        require: true,
        maxlength: 1,
        enum: ["m", "z"],
    },
    menopause: {
        type: mongoose.Schema.Types.Number,
        default: 0,
        max: 3,
        min: 0,
        require: true,
    },
    address: mongoose.Schema.Types.String,
    city: {
        type: mongoose.Schema.Types.String,
        require: true,
        default: "Beograd",
    },
    contact: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    email: mongoose.Schema.Types.String,
    tumorDateDiagnosis: mongoose.Schema.Types.Date,
    familyAnamnesis: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    date: {
        type: mongoose.Schema.Types.Date
    },
    index: {
        type: mongoose.Schema.Types.String
    },
    isClinicalStateSet: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    tStage: {
        type: mongoose.Schema.Types.String,
        enum: ["1", "1a", "1b", "1c", "2", "3",
                "4", "4a", "4b", "4c", "4d"]
    },
    nStage: {
        type: mongoose.Schema.Types.Number,
        enum: [0, 1, 2, 3],
    },
    mStage: {
        type: mongoose.Schema.Types.Number,
        enum: [0, 1],
    },
    tnmStage: {
        type: mongoose.Schema.Types.String,
    },
    clinicalStage: {
        type: mongoose.Schema.Types.String,
        enum: ["IA", "IIA", "IIB", "IIIA", "IIIB", "IIIC"],
    },
    _biopsyIds: {
        type: [{type: mongoose.Types.ObjectId, ref: "biopsy"}]
    },
    _tumorIds: {
        type: [{type: mongoose.Types.ObjectId, ref: "tumor"}]
    },
    _therapyIds: {
        type: [{type: mongoose.Types.ObjectId, ref: "therapy"}]
    }
});

patientsSchema.plugin(mongoosePaginate);

const patientsModel = mongoose.model('patients', patientsSchema);

module.exports = patientsModel;
