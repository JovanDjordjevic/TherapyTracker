const mongoose = require('mongoose');
const History = require('../models/history');

const getHistory = async () => {
    const history = await History.find({}).exec();
    return history;
};

const getHistoryByIndex = async (index) => {
    const history = await History.find({ index: index }).exec();
    return history;
};

const addNewHistory = async (
    date, index, patient
) => {
    const newHistory = new History({
        date,
        index,
        patient
    });

    await newHistory.save();
    return newHistory;
};

const deleteHistory = async (index) => {
    await History.findOneAndDelete({ index: index }).exec();
};

module.exports = {
    getHistory,
    addNewHistory,
    getHistoryByIndex,
    deleteHistory,
}