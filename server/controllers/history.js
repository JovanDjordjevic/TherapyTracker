const historyService = require('../services/history');

const getHistory = async (req, res, next) => {
    try {
        const history = await historyService.getHistory();
        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
};

const addNewHistory = async (req, res, next) => {
    const { date, patient, index } = req.body;
    try {
        if (
            !date ||
            !patient ||
            !index
        ) {
            const error = new Error('Check input data!');
            error.status = 400;
            throw error;
        }

        const newHistory = await historyService.addNewHistory(
            date, index, patient
        );
        res.status(201).json(newHistory);
    } catch (error) {
        next(error);
    }
};

const deleteHistory = async (req, res, next) => {
    const index = req.params.index;

    try {
        if (!index) {
            const error = new Error('Index missing!');
            error.status = 400;
            throw error;
        }

        const history = await historyService.getHistoryByIndex(index);
        if (!history) {
            const error = new Error('Check index!');
            error.status = 404;
            throw error;
        }

        await historyService.deleteHistory(index);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getHistory,
    addNewHistory,
    deleteHistory,
    //...
}