const mongoose = require('mongoose');
const Tumor = require('./schemas/tumor')

const historySchema = new mongoose.Schema({   
    date: {
        type: Date,
        require: true,
    },
    index: {
        type: Number,
        unique: true,
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "patients",
    },
    clinicalState: {
        T_stage: {
            type: String,
            require: true,
            enum: ["1", "1a", "1b", "1c", "2", "3",
                   "4", "4a", "4b", "4c", "4d"]
        },
        N_stage: {
            type: Number,
            require: true,
            enum: [0, 1, 2, 3],
        },
        M_stage: {
            type: Number,
            require: true,
            enum: [0, 1],
        },
        clinicalStage: {
            type: String,
            require: true,
            enum: ["IA", "IIA", "IIB", "IIIA", "IIIB", "IIIC"],
        }
    },
    biopsies: {
        type: [{type: mongoose.Types.ObjectId, ref: "biopsy"}]
    },
    tumor: {
        type: [Tumor]
    },
    therapy: {
        type: [{type: mongoose.Types.ObjectId, ref: "therapy"}]
    },
    impressions: {
        therapeuticResponse: {
            type: String
        },
        comment: {
            type: String
        }
    }
});

const historyModel = mongoose.model('history', historySchema);

module.exports = historyModel;