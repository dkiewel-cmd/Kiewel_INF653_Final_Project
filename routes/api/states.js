const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates);

router.route('/:code')
    .get(statesController.getState);

router.route('/:code/funfact')
    .get(statesController.getRandomFunFact)
    .post(statesController.addFunFact);

module.exports = router;