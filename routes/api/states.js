const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates)
    /*.post(statesController.createNewFunFact)
    .patch(statesController.updateFunFact)
    .delete(statesController.deleteFunFact);

router.route('/:code')
    .get(statesController.getStateByCode);*/

module.exports = router;