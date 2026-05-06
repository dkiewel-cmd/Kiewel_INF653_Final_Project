/*
/states/NJ endpoint GET request should return a JSON object.271ms‣
/states/KS endpoint GET request should return a JSON object with 20 properties.‣
/states/NH endpoint GET request should return a JSON object with 19 properties.‣
/states/OK endpoint GET response has funfacts property‣
/states/NE endpoint GET response has 3 or more fun facts‣
/states/RI endpoint GET response should have a funfacts property, but the value is an empty array‣
/states/anything_not_a_state_code endpoint GET response should return a message saying 'Invalid state abbreviation parameter'.‣
/states/KS endpoint GET request should return the same response as if the parameter was ks, Ks, or kS. The parameter should be case-insensitive.
*/
const express = require('express');
const router = express.Router();
const stateController = require('../../controllers/stateController');

router.route('/:code')
    .get(stateController.getState);

module.exports = router;