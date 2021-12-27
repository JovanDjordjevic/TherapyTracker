const biopsyService = require('../services/biopsy');

const getAllBiopsies = async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log("get all biopsies");

    try {
        //const biopsies = await biopsyService.getAllBiopsies();
        const biopsies = await biopsyService.paginateThroughBiopsies(page, limit);
        res.status(200).json(biopsies);
    } catch (error) {
        next(error);
    }
};

const getAllBiopsiesForPatient = async (req, res, next) => {
    const patientId = req.query._id;
    const page = req.query.page;
    const limit = req.query.limit;
    //console.log(patientId, page, limit);

    try {
        const biopsies = await biopsyService.getAllBiopsiesForPatient(patientId, page, limit);
        res.status(200).json(biopsies);
    } catch (error) {
        next(error);
    }
};

const addNewBiopsyForPatient = async (req, res, next) => {
    const patientId = req.body.patientId;
    //console.log(patientId);
    const {date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
        biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment} = req.body.biopsy;
    // console.log('...');
    
    try {
        // TODO: razmisli da li neka od ovih polja mogu da budu undefined
        if (date == undefined || side == undefined || 
            /*biopsyTypeLeft == undefined || numLeft == undefined || histotypeLeft == undefined || multifocalityLeft  == undefined ||
            biopsyTypeRight == undefined || numRight == undefined || histotypeRight == undefined || multifocalityRight  == undefined ||*/
            comment == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newBiopsy = await biopsyService.addNewBiopsy( patientId,
            date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
            biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment
        );
        res.status(201).json(newBiopsy);
    } catch (error) {
        next(error);
    }
};

const updateBiopsyInfo = async (req, res, next) => {
    //console.log(req.body.biopsy);
    const {_id, date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
        biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment} = req.body.biopsy;

    try{
        if (_id == undefined || date == undefined || side == undefined || 
            biopsyTypeLeft == undefined || numLeft == undefined || histotypeLeft == undefined || multifocalityLeft  == undefined ||
            biopsyTypeRight == undefined || numRight == undefined || histotypeRight == undefined || multifocalityRight  == undefined ||
            comment == undefined
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const updatedBiopsy = await biopsyService.updateBiopsyInfo(
            _id, date, side, biopsyTypeLeft, numLeft, histotypeLeft, multifocalityLeft,
            biopsyTypeRight, numRight, histotypeRight, multifocalityRight, comment
        );
        res.status(201).json(updatedBiopsy);
    } catch (error) {
        next(error);
    }
}

const deleteBiopsy = async (req, res, next) => {
    const patientId = req.params.patientId;
    const biopsyId = req.params.biopsyId;
    // console.log(patientId, biopsyId);

    try {
        if (patientId == undefined || biopsyId == undefined) {
            const error = new Error('One or more ids missing!');
            error.status = 400;
            throw error;
        }

        success = await biopsyService.deleteBiopsy(patientId, biopsyId);
        res.status(200).json({ success: success });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBiopsies,
    getAllBiopsiesForPatient,
    addNewBiopsyForPatient,
    updateBiopsyInfo, 
    deleteBiopsy,
}