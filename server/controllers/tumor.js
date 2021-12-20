const mongoose = require('mongoose');
const Tumor = require('../models/tumor');

const getAllTumors = async (req, res, next) => {
    //console.log('getAllTumors');
    try {
        //const tumors = await tumorService.getAllTumors();
        res.status(200).json(tumors);
    } catch (error) {
        next(error);
    }
};

const getAllTumorsForPatient = async (req, res, next) => {
    const patientId = req.query._id;
    //console.log(patientId);

    try {
        //const tumors = await tumorService.getAllTumorsForPatient(patientId);
        //res.status(200).json(tumors);
    } catch (error) {
        next(error);
    }
};

const addNewTumorForPatient = async (req, res, next) => {
    const patientId = req.body.patientId;
    //console.log(patientId, req.body.tumor);
    const {gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, pgrStatus, 
           her2INC, her2INCPercent, her2_FISH_SICH, her2Status,
           ki67, molecularSubtype} = req.body.tumor;
    // console.log('...');
    
    try {
        if (gradus == undefined || erScore == undefined || erScorePercent == undefined || erStatus == undefined || 
            pgrScore == undefined || pgrScorePercent == undefined || pgrStatus == undefined || 
            her2INC == undefined || her2INCPercent == undefined || her2_FISH_SICH == undefined || her2Status == undefined ||
            ki67 == undefined || molecularSubtype == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        // const newTumor = await tumorService.addNewTumor( patientId,
        //     gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, pgrStatus, her2INC, her2INCPercent, her2_FISH_SICH, her2Status, ki67, molecularSubtype
        // );
        // res.status(201).json(newTumor);
    } catch (error) {
        next(error);
    }
};

const updateTumorInfo = async (req, res, next) => {
    //console.log(req.body.tumor);
    const {_id, gradus, erScore, erScorePercent, erStatus, pgrScore, pgrScorePercent, pgrStatus, 
        her2INC, her2INCPercent, her2_FISH_SICH, her2Status,
        ki67, molecularSubtype} = req.body.tumor;
    // ...
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

        //success = await tumorService.deleteTumor(patientId, tumorId);
        //res.status(200).json({ success: success });
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