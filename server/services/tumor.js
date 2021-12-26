const mongoose = require('mongoose');
const Tumor = require('../models/tumor');
const Patient = require('../models/patient');

const getAllTumors = async () => {
    const tumor = await Tumor.find({}).exec();
    return tumor;
};

const getAllTumorsForPatient = async (patientId) => {
    const patient = await Patient.findById(patientId).populate("history.tumor");
    return patient.history.tumor;
};

const addNewTumor = async (patientId, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent,
    pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype) => {

    //indeksi provera
    const newTumor = new Tumor();
    const tumorId = new mongoose.Types.ObjectId();
    newTumor._id = tumorId
    newTumor.gradus = gradus,
    newTumor.erScore = erScore,
    newTumor.erScorePercent = erScorePercent,
    newTumor.erStatus = erStatus,
    newTumor.pgrScore = pgrScore,
    newTumor.pgrScorePercent = pgrScorePercent,
    newTumor.pgrStatus = pgrStatus,
    newTumor.her2INC = her2INC,
    newTumor.her2INCPercent = her2INCPercent,
    newTumor.her2_FISH_SICH = her2_FISH_SICH,
    newTumor.her2Status = her2Status,
    newTumor.ki67 = ki67
    newTumor.molecularSubtype = molecularSubtype

    await newTumor.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {'history.tumor': tumorId}}).exec();

    return newTumor;
};

const updateTumorInfo = async (id, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent,
    pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype) => {

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
                },
            },
            { new: true }
        ).exec();
    
        return updatedTumor;


}

const deleteTumor = async (patientId, tumorId) => {
    await Tumor.findByIdAndDelete(tumorId).exec();

    await Patient.findByIdAndUpdate(patientId, {$pull: {'history.tumor': tumorId}}).exec();
};

module.exports = {
    getAllTumors,
    addNewTumor,
    getAllTumorsForPatient,
    deleteTumor,
    updateTumorInfo
}