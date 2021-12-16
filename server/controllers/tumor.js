const mongoose = require('mongoose');
const Tumor = require('../models/tumor');

const getAllTumorsForPatient = async (rec, res, next) => {
    // console.log('getAllTumorsForPatient');
};

const addNewTumorForPatient = async (rec, res, next) => {
    // console.log('addNewTumorForPatient');
};

module.exports = {
    getAllTumorsForPatient,
    addNewTumorForPatient,
    //...
}