const mongoose = require('mongoose');
const Biopsy = require('../models/biopsy');
const Patient = require('../models/patient');

const getAllBiopsies = async () => {
    const biopsy = await Biopsy.find({}).exec();
    return biopsy;
};

const getAllBiopsiesForPatient = async (patientId, page=1, limit=20) => {

    return await Biopsy.paginate({patient: patientId}, {page, limit, sort: '-date'});
};

const addNewBiopsy = async (patientId, date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
    biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment) => {

    const newBiopsy = new Biopsy();
    const biopsyId = new mongoose.Types.ObjectId();
    newBiopsy._id = biopsyId;
    newBiopsy.date = date;
    newBiopsy.biopsySide = side;
    newBiopsy.biopsyTypeLeft = biopsyTypeLeft;
    newBiopsy.numLeft = numLeft;
    newBiopsy.histotypeLeft = histotypeLeft;
    newBiopsy.multifocalityLeft = multifocalityLeft;
    newBiopsy.biopsyTypeRight = biopsyTypeRight;
    newBiopsy.numRight = numRight;
    newBiopsy.histotypeRight = histotypeRight;
    newBiopsy.multifocalityRight = multifocalityRight;
    newBiopsy.comment = comment;
    newBiopsy.patient = patientId;

    await newBiopsy.save();

    await Patient.findByIdAndUpdate(patientId, {$push: {_biopsyIds: biopsyId}}).exec();

    return newBiopsy;
};

const updateBiopsyInfo = async (id, date, biopsySide, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
    biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment) => {

        const updatedBiopsy = await Biopsy.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    date: date,
                    biopsySide: biopsySide,
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

    await Patient.findByIdAndUpdate(patientId, {$pull: {_biopsyIds: biopsyId}}).exec();
};

async function paginateThroughBiopsies(page = 1, limit = 20) {
    return await Biopsy.paginate({}, { page, limit, sort: '-date'});
}

module.exports = {
    getAllBiopsies,
    addNewBiopsy,
    getAllBiopsiesForPatient,
    deleteBiopsy,
    updateBiopsyInfo,
    paginateThroughBiopsies,
}