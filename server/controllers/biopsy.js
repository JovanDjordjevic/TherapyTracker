const mongoose = require('mongoose');
const Biopsy = require('../models/biopsy');

const getAllBiopsies = async (rec, res, next) => {
    // console.log('getAllBiopsies');
};

const getAllBiopsiesForPatient = async (rec, res, next) => {
    // console.log('getAllBiopsiesForPatient');
};

const addNewBiopsy = async (rec, res, next) => {
    // console.log('addNewBiopsy');
};

const deleteBiopsy = async (rec, res, next) => {
    // console.log('deleteBiopsy');
};

module.exports = {
    getAllBiopsies,
    getAllBiopsiesForPatient,
    addNewBiopsy,
    deleteBiopsy,
    // ...
}