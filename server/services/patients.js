const mongoose = require('mongoose');
const Patient = require('../models/patient');

const getAllPatients = async () => {
    const patients = await Patient.find({}).exec();
    return patients;
};

const getPatientByJmbg = async (jmbg) => {
    const patient = await Patient.findOne({ jmbg: jmbg }).exec();
    return patient;
};

const getPatientByName = async (name) => {
    const patient = await Patient.find({ name: name }).exec();
    return patient;
};

const addNewPatient = async (
    jmbg,
    name,
    parentName,
    surname,
    yearOfBirth,
    gender,
    menopause,
    address,
    city,
    contact,
    email,
    tumorDateDiagnosis,
    familyAnamnesis
) => {
    const newPatient = new Patient({
        jmbg,
        name,
        parentName,
        surname,
        yearOfBirth,
        gender,
        menopause,
        address,
        city,
        contact,
        email,
        tumorDateDiagnosis,
        familyAnamnesis
    });

    await newPatient.save();
    return newPatient;
};

const deletePatient = async (jmbg) => {
    await Patient.findOneAndDelete({ jmbg: jmbg }).exec();
};

module.exports = {
    getAllPatients,
    getPatientByJmbg,
    getPatientByName,
    addNewPatient,
    deletePatient, 
}