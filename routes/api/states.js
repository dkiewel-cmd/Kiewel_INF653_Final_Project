const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates);

router.route('/:code')
    .get(statesController.getState);

router.route('/:code/funfact')
    .get(statesController.getRandomFunFact)
    .post(statesController.addFunFact)
    .patch(statesController.updateFunFact)
    .delete(statesController.deleteFunFact);

router.route('/:code/capital')
    .get(statesController.getStateCapital);

router.route('/:code/nickname')
    .get(statesController.getStateNickname);

router.route('/:code/population')
    .get(statesController.getStatePopulation);

router.route('/:code/admission')
    .get(statesController.getStateAdmission);

module.exports = router;