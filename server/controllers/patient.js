const patientsService = require('../services/patients');
const counterService = require('../services/counter')

const getAllPatients = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    try {
        const allPatients = await patientsService.paginateThroughPatients(page, limit);
        res.status(200).json(allPatients);

    } catch (error) {
        next(error);
    }
};

const searchForPatients = async (req, res, next) => {
    const { searchParam, page, limit } = req.query;

    if (searchParam == undefined) {
        const error = new Error('Search parameter must be valid!');
        error.status = 400;
        throw error;
    }

    try {
        const foundPatients = await patientsService.searchForPatients(searchParam, page, limit);
        res.status(200).json(foundPatients);
    } catch (error) {
        next(error);
    }
};

const addNewPatient = async (req, res, next) => {

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

        if(historyIndex == undefined){
            const error = new Error('Counter error!');
            error.status = 400;
            throw error;
        }

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

const deletePatient = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (id == undefined) {
            const error = new Error('Patient id missing!');
            error.status = 400;
            throw error;
        }

        success = await patientsService.deletePatient(id);
        res.status(200).json({ success: true }); 
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPatients,
    searchForPatients,
    addNewPatient,
    updatePatientInfo,
    deletePatient,
}