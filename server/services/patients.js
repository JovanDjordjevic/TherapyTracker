const mongoose = require('mongoose');
const {patientsModel} = require('../models/patient');

const getAllPatients = async () => {
    const patients = await patientsModel.find({}).exec();
    return patients;
};

const getPatientByJmbg = async (jmbg) => {
    const patient = await patientsModel.findOne({ jmbg: jmbg }).exec();
    return patient;
};

const getPatientByName = async (name) => {
    const patient = await patientsModel.find({ name: name }).exec();
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
    const newPatient = new patientsModel({
        _id: new mongoose.Types.ObjectId(),
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
    await patientsModel.findOneAndDelete({ jmbg: jmbg }).exec();
};

module.exports = {
    getAllPatients,
    getPatientByJmbg,
    getPatientByName,
    addNewPatient,
    deletePatient, 
}