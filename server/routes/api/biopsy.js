const express = require('express');

const biopsyController = require('../../controllers/biopsy');

const router = express.Router();

router.get('/', biopsyController.getAllBiopsies);
router.get('/getBiopsiesForPatient', biopsyController.getAllBiopsiesForPatient);

router.post('/', biopsyController.addNewBiopsyForPatient);

router.put('/', biopsyController.updateBiopsyInfo);

router.delete('/:patientId/:biopsyId/', biopsyController.deleteBiopsy);

module.exports = router;