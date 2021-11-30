const mongoose = require('mongoose');
const Patient = require('../models/patient');

const getAllPatients = async (rec, res, next) => {
    // console.log('getAllPatients');
};

const getPatientByName = async (rec, res, next) => {
    // console.log('getPatientByName');
};

const addNewPatient = async (rec, res, next) => {
    // console.log('addNewPatient');
};

const deletePatient = async (rec, res, next) => {
    // console.log('deletePatient');
};

module.exports = {
    getAllPatients,
    getPatientByName,
    addNewPatient,
    deletePatient,
    //...
}