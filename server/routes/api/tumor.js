const express = require('express');

const tumorController = require('../../controllers/tumor');

const router = express.Router();

router.get('/', tumorController.getAllTumors);
router.get('/getTumorsForPatient', tumorController.getAllTumorsForPatient);

router.post('/', tumorController.addNewTumorForPatient);

router.put('/', tumorController.updateTumorInfo);

router.delete('/:patientId/:tumorId/', tumorController.deleteTumor);

module.exports = router;