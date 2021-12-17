const express = require('express');

const patientController = require('../../controllers/patient');

const router = express.Router();

router.get('/', patientController.getAllPatients);
router.get('/findByName', patientController.getPatientByName);

router.post('/', patientController.addNewPatient);

router.delete('/:jmbg', patientController.deletePatient)

module.exports = router;