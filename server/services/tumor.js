const mongoose = require('mongoose');
const Tumor = require('../models/tumor');
const Patient = require('../models/patient');

const getAllTumors = async () => {
    const tumor = await Tumor.find({}).exec();
    return tumor;
};

const getAllTumorsForPatient = async (patientId, page=1, limit=20) => {

    return await Tumor.paginate({patient: patientId}, { page, limit, sort: '-date'});
};

const addNewTumor = async (patientId, biopsyIndex, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent,
    pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype, name, date) => {

    const newTumor = new Tumor();
    const tumorId = new mongoose.Types.ObjectId();
    newTumor._id = tumorId;
    newTumor.gradus = gradus;
    newTumor.erScore = erScore;
    newTumor.erScorePercent = erScorePercent;
    newTumor.erStatus = erStatus;
    newTumor.pgrScore = pgrScore;
    newTumor.pgrScorePercent = pgrScorePercent;
    newTumor.pgrStatus = pgrStatus;
    newTumor.her2INC = her2INC;
    newTumor.her2INCPercent = her2INCPercent;
    newTumor.her2_FISH_SICH = her2_FISH_SICH;
    newTumor.her2Status = her2Status;
    newTumor.ki67 = ki67;
    newTumor.molecularSubtype = molecularSubtype;
    newTumor.biopsyIndex = biopsyIndex;
    newTumor.name = name;
    newTumor.date = date;
    newTumor.patient = patientId;

    await newTumor.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {_tumorIds: tumorId}}).exec();

    return newTumor;
};

const updateTumorInfo = async (id, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, name, date,
    pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype, biopsyIndex) => {

        const updatedTumor = await Tumor.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    gradus: gradus,
                    erScore: erScore,
                    erScorePercent: erScorePercent,
                    erStatus: erStatus,
                    pgrScore: pgrScore,
                    pgrScorePercent: pgrScorePercent,
                    pgrStatus: pgrStatus,
                    nuher2INCmRight: her2INC,
                    her2INCPercent: her2INCPercent,
                    her2_FISH_SICH: her2_FISH_SICH,
                    her2Status: her2Status,
                    ki67: ki67,
                    molecularSubtype: molecularSubtype,
                    biopsyIndex: biopsyIndex,
                    name: name,
                    date: date  
                },
            },
            { new: true }
        ).exec();
    
        return updatedTumor;


}

const deleteTumor = async (patientId, tumorId) => {
    await Tumor.findByIdAndDelete(tumorId).exec();

    await Patient.findByIdAndUpdate(patientId, {$pull: {_tumorIds: tumorId}}).exec();
};

async function paginateThroughTumors(page = 1, limit = 20) {
    return await Tumor.paginate({}, { page, limit, sort: '-date'});
}

module.exports = {
    getAllTumors,
    addNewTumor,
    getAllTumorsForPatient,
    deleteTumor,
    updateTumorInfo,
    paginateThroughTumors
}