const mongoose = require('mongoose');

const tumorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    T_stage: {
        type: String,
        require: true,
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
    }
});

//const tumorModel = mongoose.model('tumor', tumorSchema);

module.exports = tumorSchema;