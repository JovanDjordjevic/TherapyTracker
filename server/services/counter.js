//const mongoose = require('mongoose');
const Counter = require('../models/counter');
const Patient = require('../models/patient');
const Biopsy = require('../models/biopsy');

const checkCounter = async () => {
    const counter = await Counter.findOne({}).exec();

    if(!counter){
        const newCounter = new Counter();
        await newCounter.save();
    }
}

const getHistoryIndex = async () => {
    const counter = await Counter.findOneAndUpdate({}, {$inc: {historyIndexCounter: 1}}).exec();
    const index = counter.historyIndexCounter;

    return index;
}

const getBiopsyIndex = async () => {
    const counter = await Counter.findOneAndUpdate({}, {$inc: {biopsyIndexCounter: 1}}).exec();
    const index = counter.biopsyIndexCounter;

    return index;
}

module.exports = {
    checkCounter,
    getHistoryIndex,
    getBiopsyIndex
}