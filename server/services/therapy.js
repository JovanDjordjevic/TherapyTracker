const mongoose = require('mongoose');
const Therapy = require('../models/therapy');
const Patient = require('../models/patient');

const getAllTherapies = async () => {
    const therapy = await Therapy.find({}).exec();
    return therapy;
};

const getAllTherapiesForPatient = async (patientId) => {
    const patient = await Patient.findById(patientId).populate("history.therapy");
    return patient.history.therapy;
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

    await Patient.findByIdAndUpdate(patientId, {$push: {'history.therapy': therapyId}}).exec();

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

    await Patient.findByIdAndUpdate(patientId, {$pull: {'history.biopsies': tumorId}}).exec();
};

module.exports = {
    getAllTherapies,
    addNewTherapy,
    getAllTherapiesForPatient,
    deleteTherapy,
    updateTherapyInfo
}