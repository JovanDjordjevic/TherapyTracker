const express = require('express');

const therapyController = require('../../controllers/therapy');

const router = express.Router();

router.get('/', therapyController.getTherapyForPatient);

router.post('/', therapyController.addNewTherapy);

module.exports = router;