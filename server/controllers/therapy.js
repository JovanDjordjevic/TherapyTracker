const therapyService = require('../services/therapy');

const getAllTherapies = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log('getAllTherapies');
    try {
        const therapies = await therapyService.paginateThroughTherapies(page, limit);
        res.status(200).json(therapies);
    } catch (error) {
        next(error);
    }
};

const getAllTherapiesForPatient = async (req, res, next) => {
    const patientId = req.query._id;
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log(patientId);

    try {
        const therapies = await therapyService.getAllTherapiesForPatient(patientId, page, limit);
        res.status(200).json(therapies);
    } catch (error) {
        next(error);
    }
};

const addNewTherapyForPatient = async (req, res, next) => {
    const patientId = req.body.patientId;
    //console.log(patientId, req.body.therapy);
    const {therapyType, numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment} = req.body.therapy;
    // console.log('...');
    
    try {
        if (therapyType == undefined || numCycles == undefined || usingNeoadjuvant == undefined || numTaxol == undefined || 
            numTxtr == undefined || herceptinTherapy == undefined || comment == undefined 
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newTherapy = await therapyService.addNewTherapy( patientId, therapyType,
            numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment
        );
        res.status(201).json(newTherapy);
    } catch (error) {
        next(error);
    }
};

const updateTherapyInfo = async (req, res, next) => {
    //console.log(req.body.therapy);
    const {_id, isTherapyResponseSet, therapyResponse, therapyType, numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment} = req.body.therapy;
    
    try{
        if (_id == undefined || isTherapyResponseSet == undefined || therapyResponse == undefined || therapyType == undefined||
            numCycles == undefined || usingNeoadjuvant == undefined ||numTaxol == undefined ||
            numTxtr == undefined || herceptinTherapy == undefined || comment == undefined 
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const updatedTherapy = await therapyService.updateTherapyInfo(
            _id, isTherapyResponseSet, therapyResponse, therapyType, numCycles,
            usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment
        );
        res.status(201).json(updatedTherapy);
    } catch (error) {
        next(error);
    }
};

const deleteTherapy = async (req, res, next) => {
    const patientId = req.params.patientId;
    const therapyId = req.params.therapyId;
    //console.log(patientId, therapyId);

    try {
        if (patientId == undefined || therapyId == undefined) {
            const error = new Error('One or more ids missing!');
            error.status = 400;
            throw error;
        }

        success = await therapyService.deleteTherapy(patientId, therapyId);
        res.status(200).json({ success: success });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTherapies,
    getAllTherapiesForPatient,
    addNewTherapyForPatient,
    updateTherapyInfo,
    deleteTherapy
}