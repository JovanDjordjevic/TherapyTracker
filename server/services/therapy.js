const mongoose = require('mongoose');
const Therapy = require('../models/therapy');
const Patient = require('../models/patient');

const getAllTherapies = async () => {
    const therapy = await Therapy.find({}).exec();
    return therapy;
};

const getAllTherapiesForPatient = async (patientId, page=1, limit=20) => {
    return await Therapy.paginate({patient: patientId}, { page, limit, sort: '-date'});
};

const addNewTherapy = async (patientId, therapyType, date, numCycles,
    numTaxol, numTxtr, herceptinTherapy, therapyShortString, comment, isTherapyResponseSet, therapyResponse) => {

    const newTherapy = new Therapy();
    const therapyId = new mongoose.Types.ObjectId();
    newTherapy._id = therapyId;
    newTherapy.therapyType = therapyType;
    newTherapy.numCycles = numCycles;
    newTherapy.numTaxol = numTaxol;
    newTherapy.numTxtr = numTxtr;
    newTherapy.herceptinTherapy = herceptinTherapy;
    newTherapy.therapyShortString = therapyShortString;
    newTherapy.comment = comment;
    newTherapy.patient = patientId;
    newTherapy.date = date;
    newTherapy.isTherapyResponseSet = isTherapyResponseSet;
    newTherapy.therapyResponse = therapyResponse;

    await newTherapy.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {_therapyIds: therapyId}}).exec();

    return newTherapy;
};

const updateTherapyInfo = async (id, isTherapyResponseSet, therapyResponse, therapyType,
    numCycles, numTaxol, numTxtr, herceptinTherapy, therapyShortString, comment, date) => {

        const updatedTherapy = await Therapy.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    isTherapyResponseSet: isTherapyResponseSet,
                    therapyResponse: therapyResponse,
                    therapyType: therapyType,
                    numCycles: numCycles,
                    numTaxol: numTaxol,
                    numTxtr: numTxtr,
                    herceptinTherapy: herceptinTherapy,
                    therapyShortString: therapyShortString,
                    comment: comment,
                    date: date
                },
            },
            { new: true }
        ).exec();
    
    return updatedTherapy;
}

const deleteTherapy = async (patientId, therapyId) => {
    await Therapy.findByIdAndDelete(therapyId).exec();
    await Patient.findByIdAndUpdate(patientId, {$pull: {_therapyIds: therapyId}}).exec();
};

async function paginateThroughTherapies(page = 1, limit = 20) {
    return await Therapy.paginate({}, { page, limit, sort: '-date'});
}

module.exports = {
    getAllTherapies,
    addNewTherapy,
    getAllTherapiesForPatient,
    deleteTherapy,
    updateTherapyInfo,
    paginateThroughTherapies
}