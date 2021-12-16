const express = require('express');

const historyController = require('../../controllers/history');

const router = express.Router();

router.get('/', historyController.getHistory);

router.post('/', historyController.addNewHistory);

router.delete('/:index', historyController.deleteHistory);


module.exports = router;