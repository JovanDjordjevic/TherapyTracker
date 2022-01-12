const mongoose = require('mongoose');
const Patient = require('../models/patient');
const Biopsy = require('../models/biopsy')
const Tumor = require('../models/tumor')
const Therapy = require('../models/therapy')


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

// TODO: naci nacin da se nad ovim izvrsi pagination
const searchForPatients = async (searchParam, page, limit) => {
    const regex = RegExp(searchParam, 'i');
    //const foundPatients = await Patient.find({$or: [{name: regex}, {surname: regex}, {jmbg: regex}] });
    const foundPatients = await Patient.find({
        "$expr": {
          "$regexMatch": {
            "input": { "$concat": ["$name", " ", "$surname", " ", "$jmbg"] },
            "regex": regex
          }
        }
      });
    //console.log("found ", foundPatients);
    return foundPatients;
};

const addNewPatient = async (
    date, index, jmbg, name, parentName, surname, yearOfBirth, gender, menopause,
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

    if(gender === "z" && menopause === 0){
        const error = new Error('Zena mora imati menopauzu!');
        error.status = 403;
        throw error; 
    }


    const newPatient = new Patient();
    newPatient._id = new mongoose.Types.ObjectId();
    newPatient.date = date;
    newPatient.index = index;
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

    await Tumor.deleteMany({patient: id}).exec();
    await Biopsy.deleteMany({patient: id}).exec();
    await Therapy.deleteMany({patient: id}).exec();

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
                date: date,
                index: index,
                isClinicalStateSet: isClinicalStateSet,
                tStage: tStage,
                nStage: nStage,
                mStage: mStage,
                tnmStage: tnmStage,
                clinicalStage: clinicalStage,
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

async function paginateThroughPatients(page = 1, limit = 20) {
    return await Patient.paginate({}, { page, limit, sort: '-history.date'});
}

module.exports = {
    getAllPatients,
    getPatientByJmbg,
    getPatientsByFirstName,
    getPatientsByLastName,
    getPatientsByFullName,
    searchForPatients,
    addNewPatient,
    deletePatient,
    updatePatientInfo,
    paginateThroughPatients,
}