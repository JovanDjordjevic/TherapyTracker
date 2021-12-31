const mongoose = require('mongoose');
const Therapy = require('../models/therapy');
const Patient = require('../models/patient');

const getAllTherapies = async () => {
    const therapy = await Therapy.find({}).exec();
    return therapy;
};

const getAllTherapiesForPatient = async (patientId, page=1, limit=20) => {
    
    return await Therapy.paginate({patient: patientId}, {page, limit});
};

const addNewTherapy = async (patientId, therapyType, numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment) => {

    const newTherapy = new Therapy();
    const therapyId = new mongoose.Types.ObjectId();
    newTherapy._id = therapyId;
    newTherapy.therapyType = therapyType;
    newTherapy.numCycles = numCycles;
    newTherapy.usingNeoadjuvant = usingNeoadjuvant;
    newTherapy.numTaxol = numTaxol;
    newTherapy.numTxtr = numTxtr;
    newTherapy.herceptinTherapy = herceptinTherapy;
    newTherapy.comment = comment;
    newTherapy.patient = patientId;

    await newTherapy.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {_therapyIds: therapyId}}).exec();

    return newTherapy;
};

const updateTherapyInfo = async (id, isTherapyResponseSet, therapyResponse, therapyType, numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment) => {

        const updatedTherapy = await Therapy.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    isTherapyResponseSet: isTherapyResponseSet,
                    therapyResponse: therapyResponse,
                    therapyType: therapyType,
                    numCycles: numCycles,
                    usingNeoadjuvant: usingNeoadjuvant,
                    numTaxol: numTaxol,
                    numTxtr: numTxtr,
                    herceptinTherapy: herceptinTherapy,
                    comment: comment,
                },
            },
            { new: true }
        ).exec();
    
        return updatedTherapy;


}

const deleteTherapy = async (patientId, tumorId) => {
    await Tumor.findByIdAndDelete(tumorId).exec();

    await Patient.findByIdAndUpdate(patientId, {$pull: {_therapyIds: tumorId}}).exec();
};

async function paginateThroughTherapies(page = 1, limit = 20) {
    return await Therapy.paginate({}, {page, limit});
}

module.exports = {
    getAllTherapies,
    addNewTherapy,
    getAllTherapiesForPatient,
    deleteTherapy,
    updateTherapyInfo,
    paginateThroughTherapies
}