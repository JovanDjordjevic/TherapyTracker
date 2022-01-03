const tumorService = require('../services/tumor');

const getAllTumors = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log('getAllTumors');
    try {
        const tumors = await tumorService.paginateThroughTumors(page, limit);
        res.status(200).json(tumors);
    } catch (error) {
        next(error);
    }
};

const getAllTumorsForPatient = async (req, res, next) => {
    const patientId = req.query._id;
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log(patientId);

    try {
        const tumors = await tumorService.getAllTumorsForPatient(patientId, page, limit);
        res.status(200).json(tumors);
    } catch (error) {
        next(error);
    }
};

const addNewTumorForPatient = async (req, res, next) => {
    const patientId = req.body.patientId;
    //console.log(patientId, req.body.tumor);
    const {gradus, biopsyIndex, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, pgrStatus, 
           her2INC, her2INCPercent, her2_FISH_SICH, her2Status, name, date,
           ki67, molecularSubtype} = req.body.tumor;
    // console.log('...');
    
    try {
        if (gradus == undefined || biopsyIndex == undefined || erScore == undefined || erScorePercent == undefined || erStatus == undefined || 
            pgrScore == undefined || pgrScorePercent == undefined || pgrStatus == undefined || name == undefined || date == undefined ||
            her2INC == undefined || her2INCPercent == undefined || her2_FISH_SICH == undefined || her2Status == undefined ||
            ki67 == undefined || molecularSubtype == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newTumor = await tumorService.addNewTumor( patientId, biopsyIndex, gradus, erScore, erScorePercent, erStatus, pgrScore,
            pgrScorePercent, pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype, name, date
        );
        res.status(201).json(newTumor);
    } catch (error) {
        next(error);
    }
};

const updateTumorInfo = async (req, res, next) => {
    //console.log(req.body.tumor);
    const {_id, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, pgrStatus, 
        her2INC, her2INCPercent, her2_FISH_SICH, her2Status, biopsyIndex, name, date,
        ki67, molecularSubtype} = req.body.tumor;
    
    try{
        if (_id == undefined || gradus == undefined || erScore == undefined || erScorePercent == undefined || name == undefined ||
            erStatus == undefined || pgrScore == undefined || pgrScorePercent == undefined || pgrStatus == undefined || date == undefined ||
            her2INC == undefined || her2INCPercent == undefined || her2_FISH_SICH == undefined || her2Status == undefined ||
            ki67 == undefined || molecularSubtype == undefined || biopsyIndex == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const updatedTumor = await tumorService.updateTumorInfo(
            _id, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, name,
            date, pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status,
            ki67, molecularSubtype, biopsyIndex
        );
        res.status(201).json(updatedTumor);
    } catch (error) {
        next(error);
    }
};

const deleteTumor = async (req, res, next) => {
    const patientId = req.params.patientId;
    const tumorId = req.params.tumorId;
    //console.log(patientId, tumorId);

    try {
        if (patientId == undefined || tumorId == undefined) {
            const error = new Error('One or more ids missing!');
            error.status = 400;
            throw error;
        }

        success = await tumorService.deleteTumor(patientId, tumorId);
        res.status(200).json({ success: success });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTumors,
    getAllTumorsForPatient,
    addNewTumorForPatient,
    updateTumorInfo,
    deleteTumor,
}