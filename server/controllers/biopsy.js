const biopsyService = require('../services/biopsy');

const getAllBiopsies = async (req, res, next) => {
    try {
        const biopsy = await biopsyService.getAllBiopsies();
        res.status(200).json(biopsy);
    } catch (error) {
        next(error);
    }
};

const getAllBiopsiesForPatient = async (req, res, next) => {
};

const addNewBiopsy = async (req, res, next) => {
    const { date, side, biopsyType, index, histotype, multifocality, comment } = req.body;
    try {
        if (
            !date ||
            !side ||
            !biopsyType ||
            !index ||
            !histotype ||
            !multifocality ||
            !comment
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newBiopsy = await biopsyService.addNewBiopsy(
            date, side, biopsyType, index, histotype, multifocality, comment
        );
        res.status(201).json(newBiopsy);
    } catch (error) {
        next(error);
    }
};

const deleteBiopsy = async (req, res, next) => {
    const index = req.params.index;

    try {
        if (!index) {
            const error = new Error('Index missing!');
            error.status = 400;
            throw error;
        }

        const biopsy = await biopsyService.getBiopsyByIndex(index);
        if (!biopsy) {
            const error = new Error('Check index!');
            error.status = 404;
            throw error;
        }

        await biopsyService.deleteBiopsy(index);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBiopsies,
    getAllBiopsiesForPatient,
    addNewBiopsy,
    deleteBiopsy,
    // ...
}