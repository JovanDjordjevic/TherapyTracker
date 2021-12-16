const mongoose = require('mongoose');
const Biopsy = require('../models/biopsy');

const getAllBiopsies = async () => {
    const biopsy = await Biopsy.find({}).exec();
    return biopsy;
};

const getBiopsyByIndex = async (index) => {
    const biopsy = await Biopsy.find({ index: index }).exec();
    return biopsy;
};

const addNewBiopsy = async (
    date, side, biopsyType, index, histotype, multifocality, comment
) => {
    const newBiopsy = new Biopsy({
        date,
        side,
        biopsyType,
        index,
        histotype,
        multifocality,
        comment
    });

    await newBiopsy.save();
    return newBiopsy;
};

const deleteBiopsy = async (index) => {
    await Biopsy.findOneAndDelete({ index: index }).exec();
};

module.exports = {
    getAllBiopsies,
    addNewBiopsy,
    getBiopsyByIndex,
    deleteBiopsy,
}