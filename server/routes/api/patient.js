const express = require('express');

const patientController = require('../../controllers/patient');

const router = express.Router();

router.get('/', patientController.getAllPatients);
router.get('/findByName', patientController.getPatientByName);
router.get('/searchForPatients', patientController.searchForPatients);

router.post('/', patientController.addNewPatient);

router.put('/', patientController.updatePatientInfo);

router.delete('/:id', patientController.deletePatient)

module.exports = router;