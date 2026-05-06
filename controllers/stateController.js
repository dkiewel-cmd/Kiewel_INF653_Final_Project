const State = require('../model/State');
const statesData = {
    states: require('../model/statesData.json')
};

// go through the statesData.json and find a specific "code": (ex: KS, AL, WA)
// if it exists, display the information for that state
// if it doesn't exist, respond with status 204 and a message saying
// No state found.


const getState = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const state = statesData.states.find(s => s.code === stateCode);

    if (state) {
        res.json(state);
    } else {
        return res.status(400).send({ "message": "Invalid state abbreviation parameter"});
    }
}

module.exports = { getState };