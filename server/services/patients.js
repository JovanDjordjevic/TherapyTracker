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

const getPatientsByFirstName = async (firstName) => {
    const patients = await Patient.find({ name: firstName }).exec();
    return patients;
};

const getPatientsByLastName = async (lastName) => {
    const patients = await Patient.find({ surname: lastName }).exec();
    return patients;
};

const getPatientsByFullName = async (firstName, lastName) => {
    const patients = await Patient.find({ name: firstName, surname: lastName }).exec();
    return patients;
};

const addNewPatient = async (
    jmbg, name, parentName, surname, yearOfBirth, gender, menopause,
    address,city, contact, email, tumorDateDiagnosis, familyAnamnesis
) => {

    // TODO: dodati proveru podataka, npr da li je jmbg jedinstven na nivou cele baze itd

    const newPatient = new Patient();
    newPatient._id = new mongoose.Types.ObjectId();
    newPatient.jmbg = jmbg;
    newPatient.name = name;
    newPatient.parentName = parentName;
    newPatient.surname = surname;
    newPatient.yearOfBirth = yearOfBirth;
    newPatient.gender = gender;
    newPatient.menopause = menopause;
    newPatient.address = address;
    newPatient.city = city;
    newPatient.contact = contact;
    newPatient.email = email;
    newPatient.tumorDateDiagnosis = tumorDateDiagnosis;
    newPatient.familyAnamnesis = familyAnamnesis;

    // todo ovde dodati da se napravi karton, pa se poveze sa pacijentom (?)
    
    await newPatient.save();
    return newPatient;
};

const deletePatient = async (jmbg) => {
    await Patient.findOneAndDelete({ jmbg: jmbg }).exec();
};

// delete preko _id ?

module.exports = {
    getAllPatients,
    getPatientByJmbg,
    getPatientsByFirstName,
    getPatientsByLastName,
    getPatientsByFullName,
    addNewPatient,
    deletePatient, 
}