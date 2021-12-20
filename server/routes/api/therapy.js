const express = require('express');

const therapyController = require('../../controllers/therapy');

const router = express.Router();

router.get('/', therapyController.getAllTherapies);
router.get('/getTherapiesForPatient', therapyController.getAllTherapiesForPatient);

router.post('/', therapyController.addNewTherapyForPatient);

router.put('/', therapyController.updateTherapyInfo);

router.delete('/:patientId/:therapyId/', therapyController.deleteTherapy);


module.exports = router;