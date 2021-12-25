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
    address, city, contact, email, tumorDateDiagnosis, familyAnamnesis
) => {

    const patient = await Patient.findOne({jmbg: jmbg}).exec();
    if (patient != undefined) {
        const error = new Error('Jmbg vec postoji!');
        error.status = 403;
        throw error;
    }

    if(gender === "m" && menopause !== 0){
        const error = new Error('Muskarac nema menopauzu!');
        error.status = 403;
        throw error;
    }


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

    await newPatient.save();
    return newPatient;
};

const deletePatient = async (id) => {
    await Patient.deleteOne({ _id: id }).exec();
};

const updatePatientInfo = async (id, date, index, isClinicalStateSet,
    tStage, nStage, mStage, tnmStage, clinicalStage, jmbg, name,
    parentName, surname, yearOfBirth, gender, menopause, address, city,
    contact, email, tumorDateDiagnosis, familyAnamnesis) => {

    const updatedPatient = await Patient.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                'history.date': date,
                'history.index': index,
                'history.isClinicalStateSet': isClinicalStateSet,
                'history.clinicalState.tStage': tStage,
                'history.clinicalState.nStage': nStage,
                'history.clinicalState.mStage': mStage,
                'history.clinicalState.tnmStage': tnmStage,
                'history.clinicalState.clinicalStage': clinicalStage,
                jmbg: jmbg,
                name: name,
                parentName: parentName,
                surname: surname,
                yearOfBirth: yearOfBirth,
                gender: gender,
                menopause: menopause,
                address: address,
                city: city,
                contact: contact,
                email: email,
                tumorDateDiagnosis: tumorDateDiagnosis,
                familyAnamnesis: familyAnamnesis,
            },
        },
        { new: true }
    ).exec();

    return updatedPatient;
}

async function paginateThroughPatients(page = 1, limit = 10) {
    return await Patient.paginate({}, { page, limit, sort: 'history.date'});
}

module.exports = {
    getAllPatients,
    getPatientByJmbg,
    getPatientsByFirstName,
    getPatientsByLastName,
    getPatientsByFullName,
    addNewPatient,
    deletePatient,
    updatePatientInfo,
    paginateThroughPatients,
}