const mongoose = require('mongoose');
const Biopsy = require('../models/biopsy');
const Patient = require('../models/patient');

const getAllBiopsies = async () => {
    const biopsy = await Biopsy.find({}).exec();
    return biopsy;
};

const getAllBiopsiesForPatient = async (patientId) => {
    const patient = await Patient.findById(patientId).exec();
    return patient.history.biopsies;
};

const addNewBiopsy = async (patientId, date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
    biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment) => {

    //indeksi provera
    const newBiopsy = new Biopsy();
    const biopsyId = new mongoose.Types.ObjectId();
    newBiopsy._id = biopsyId
    newBiopsy.date = date,
    newBiopsy.side = side,
    newBiopsy.biopsyTypeLeft = biopsyTypeLeft,
    newBiopsy.numLeft = numLeft,
    newBiopsy.histotypeLeft = histotypeLeft,
    newBiopsy.multifocalityLeft = multifocalityLeft,
    newBiopsy.biopsyTypeRight = biopsyTypeRight,
    newBiopsy.numRight = numRight,
    newBiopsy.histotypeRight = histotypeRight,
    newBiopsy.multifocalityRight = multifocalityRight,
    newBiopsy.comment = comment
    newBiopsy.patient = patientId

    await newBiopsy.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {'history.biopsies': biopsyId}}).exec();

    return newBiopsy;
};

const updateBiopsyInfo = async (id, date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
    biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment) => {

        const updatedBiopsy = await Biopsy.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    date: date,
                    side: side,
                    biopsyTypeLeft: biopsyTypeLeft,
                    numLeft: numLeft,
                    histotypeLeft: histotypeLeft,
                    multifocalityLeft: multifocalityLeft,
                    biopsyTypeRight: biopsyTypeRight,
                    numRight: numRight,
                    histotypeRight: histotypeRight,
                    multifocalityRight: multifocalityRight,
                    comment: comment,
                },
            },
            { new: true }
        ).exec();
    
        return updatedBiopsy;


}

const deleteBiopsy = async (patientId, biopsyId) => {
    await Biopsy.findByIdAndDelete(biopsyId).exec();

    await Patient.findByIdAndUpdate(patientId, {$pull: {'history.biopsies': biopsyId}}).exec();
};

module.exports = {
    getAllBiopsies,
    addNewBiopsy,
    getAllBiopsiesForPatient,
    deleteBiopsy,
    updateBiopsyInfo
}