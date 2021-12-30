const patientsService = require('../services/patients');
const counterService = require('../services/counter')

const getAllPatients = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    try {
        // const allPatients = await patientsService.getAllPatients();
        // res.status(200).json(allPatients);
        const allPatients = await patientsService.paginateThroughPatients(page, limit);
        res.status(200).json(allPatients);

    } catch (error) {
        next(error);
    }
};

const getPatientByName = async (req, res, next) => {
    const { firstName, lastName } = req.query;
    //console.log("firstname ", firstName, " lastname ", lastName);

    if (firstName == undefined && lastName == undefined) {
        const error = new Error('First name and last name cannot be undefined!');
        error.status = 400;
        throw error;
    }

    try {
        if (firstName !== "" && lastName === "") {           // samo po imenu
            const patients = await patientsService.getPatientsByFirstName(firstName);
            res.status(200).json(patients);
        } else if (firstName === "" && lastName !== "") {           // samo po prezimenu
            const patients = await patientsService.getPatientsByLastName(lastName);
            res.status(200).json(patients);
        } else {    // i ime i prezime
            const patients = await patientsService.getPatientsByFullName(firstName, lastName);
            res.status(200).json(patients);
        }
    } catch (error) {
        next(error);
    }
};

// TODO: izmeniti tako da se otvori novi karton za novog pacijenta i onda da se vrati taj karton
const addNewPatient = async (req, res, next) => {
    //console.log(req.body.patient);
    const { jmbg, name, parentName, surname, yearOfBirth, gender, menopause, address,
        city, contact, email, tumorDateDiagnosis, familyAnamnesis} = req.body.patient;

    try {
        if (jmbg == undefined || name == undefined || parentName == undefined || surname == undefined || 
            yearOfBirth == undefined || gender == undefined || menopause  == undefined ||
            city == undefined || contact == undefined || familyAnamnesis == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        await counterService.checkCounter();
        const historyIndex = await counterService.getHistoryIndex();

        const date = new Date();
        const index = historyIndex + '/' + date.getFullYear();

        const newPatient = await patientsService.addNewPatient(
            date, index, jmbg, name, parentName, surname, yearOfBirth, gender, menopause,
            address, city, contact, email, tumorDateDiagnosis, familyAnamnesis
        );
        res.status(201).json(newPatient);
    } catch (error) {
        console.log('caught');
        next(error);
    }
};

const updatePatientInfo = async (req, res, next) => {
    const { _id, date, index, isClinicalStateSet, tStage, nStage, mStage, tnmStage,
        clinicalStage, jmbg, name, parentName, surname, yearOfBirth, gender,
        menopause, address, city, contact, email, tumorDateDiagnosis, familyAnamnesis} = req.body.patient

    try{
        if (_id == undefined || jmbg == undefined || name == undefined || parentName == undefined || surname == undefined || 
            yearOfBirth == undefined || gender == undefined || menopause  == undefined || 
            city == undefined || contact == undefined || familyAnamnesis == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const updatedPatient = await patientsService.updatePatientInfo(
            _id, date, index, isClinicalStateSet, tStage, nStage, mStage, tnmStage,
            clinicalStage, jmbg, name, parentName, surname, yearOfBirth, gender,
            menopause, address, city, contact, email, tumorDateDiagnosis, familyAnamnesis
        ); 
        res.status(201).json(updatedPatient);
    } catch (error) {
        next(error);
    }
};

// TODO: da li je mozda bolje da se brisu na osnovu mongo _id ?
const deletePatient = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (id == undefined) {
            const error = new Error('Patient id missing!');
            error.status = 400;
            throw error;
        }

        //const patient = await patientsService.getPatientById(id);
        // if (!patient) {
        //     const error = new Error('Check id!');
        //     error.status = 404;
        //     throw error;
        // }

        success = await patientsService.deletePatient(id);
        res.status(200).json({ success: true }); 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPatients,
    getPatientByName,
    addNewPatient,
    updatePatientInfo,
    deletePatient,
}