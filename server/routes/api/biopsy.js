const express = require('express');

const biopsyController = require('../../controllers/biopsy');

const router = express.Router();

router.get('/', biopsyController.getAllBiopsies);
router.get('/:name', biopsyController.getAllBiopsiesForPatient);

router.post('/', biopsyController.addNewBiopsy);

router.delete('/', biopsyController.deleteBiopsy);


module.exports = router;