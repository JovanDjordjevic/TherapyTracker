const patientsService = require('../services/patients');

const getAllPatients = async (req, res, next) => {
    try {
        const allPatients = await patientsService.getAllPatients();
        res.status(200).json(allPatients);
    } catch (error) {
        next(error);
    }
};

const getPatientByName = async (req, res, next) => {
    const name = req.params.name;

    try {
        if (name == undefined) {
            const error = new Error('Name missing!');
            error.status = 400;
            throw error;
        }

        const patient = await patientsService.getPatientByName(name);
        if (patient == null) {
            res.status(404).json();
        } else {
            res.status(200).json(patient);
        }
    } catch (error) {
        next(error);
    }
};

const addNewPatient = async (req, res, next) => {
    const { jmbg, name, parentName, surname, yearOfBirth, gender, menopause, address,
        city, contact, email, tumorDateDiagnosis, familyAnamnesis } = req.body;
    try {
        if (
            !jmbg ||
            !name ||
            !parentName ||
            !surname ||
            !yearOfBirth ||
            !gender ||
            !menopause ||
            !city ||
            !contact ||
            !tumorDateDiagnosis ||
            !familyAnamnesis
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newPatient = await patientsService.addNewPatient(
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
        );
        res.status(201).json(newPatient);
    } catch (error) {
        next(error);
    }
};

const deletePatient = async (req, res, next) => {
    const jmbg = req.params.jmbg;

    try {
        if (!jmbg) {
            const error = new Error('Jmbg missing!');
            error.status = 400;
            throw error;
        }

        const patient = await patientsService.getPatientByJmbg(jmbg);
        if (!patient) {
            const error = new Error('Check jmbg!');
            error.status = 404;
            throw error;
        }

        await patientsService.deletePatient(jmbg);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPatients,
    getPatientByName,
    addNewPatient,
    deletePatient,
    //...
}