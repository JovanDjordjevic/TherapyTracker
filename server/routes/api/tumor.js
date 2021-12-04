const express = require('express');

const tumorController = require('../../controllers/tumor');

const router = express.Router();

router.get('/', tumorController.getAllTumorsForPatient);

router.post('/', tumorController.addNewTumorForPatient);

module.exports = router;