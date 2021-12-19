const mongoose = require('mongoose');

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
    tumorDateDiagnosis: {
        type: mongoose.Schema.Types.Date,
        require: true,
    },
    familyAnamnesis: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    history: {
        date: {
            type: mongoose.Schema.Types.Date,
            require: true,
        },
        index: {
            type: mongoose.Schema.Types.Number,
            unique: true,
        },
        clinicalState: {
            T_stage: {
                type: mongoose.Schema.Types.String,
                require: true,
                enum: ["1", "1a", "1b", "1c", "2", "3",
                       "4", "4a", "4b", "4c", "4d"]
            },
            N_stage: {
                type: mongoose.Schema.Types.Number,
                require: true,
                enum: [0, 1, 2, 3],
            },
            M_stage: {
                type: mongoose.Schema.Types.Number,
                require: true,
                enum: [0, 1],
            },
            clinicalStage: {
                type: mongoose.Schema.Types.String,
                require: true,
                enum: ["IA", "IIA", "IIB", "IIIA", "IIIB", "IIIC"],
            }
        },
        biopsies: {
            type: [{type: mongoose.Types.ObjectId, ref: "biopsy"}]
        },
        tumor: {
            type: [{type: mongoose.Types.ObjectId, ref: "tumor"}]
        },
        therapy: {
            type: [{type: mongoose.Types.ObjectId, ref: "therapy"}]
        }
    }
});

const patientsModel = mongoose.model('patients', patientsSchema);

module.exports = patientsModel;
