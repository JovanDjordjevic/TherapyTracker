const mongoose = require('mongoose');
const Therapy = require('../models/therapy');

const getAllTherapies = async (req, res, next) => {
    //console.log('getAllTherapies');
    try {
        //const therapies = await therapyService.getAllTherapies();
        res.status(200).json(therapies);
    } catch (error) {
        next(error);
    }
};

const getAllTherapiesForPatient = async (req, res, next) => {
    const patientId = req.query._id;
    //console.log(patientId);

    try {
        //const therapies = await therapyService.getAllTherapiesForPatient(patientId);
        //res.status(200).json(therapies);
    } catch (error) {
        next(error);
    }
};

const addNewTherapyForPatient = async (req, res, next) => {
    const patientId = req.body.patientId;
    //console.log(patientId, req.body.therapy);
    const {numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment} = req.body.therapy;
    // console.log('...');
    
    try {
        if (numCycles == undefined || usingNeoadjuvant == undefined || numTaxol == undefined || 
            numTxtr == undefined || herceptinTherapy == undefined || comment == undefined 
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        // const newTherapy = await therapyService.addNewTherapy( patientId,
        //     numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment
        // );
        // res.status(201).json(newTherapy);
    } catch (error) {
        next(error);
    }
};

const updateTherapyInfo = async (req, res, next) => {
    //console.log(req.body.therapy);
    const {_id, isTherapyResponseSet, therapyResponse, numCycles, usingNeoadjuvant, numTaxol, numTxtr, herceptinTherapy, comment} = req.body.therapy;
    // ...
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

        //success = await therapyService.deleteTherapy(patientId, therapyId);
        //res.status(200).json({ success: success });
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