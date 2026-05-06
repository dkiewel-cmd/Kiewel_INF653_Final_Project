const State = require('../model/State');
const data = {
    states: require('../model/statesData.json')
    //setFunFact: function (data) {[ this.funfact = data ]}
};

const getAllStates = (req, res) => {
    const { contig } = req.query;
    let results = data.states;
    const nonContig = ['AK', 'HI'];

    if (contig === 'true') {
        results = results.filter(s => !nonContig.includes(s.code));
    } else if (contig === 'false') {
        results = results.filter(s => nonContig.includes(s.code));
    }

    res.json(results);
};

const getState = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const state = data.states.find(s => s.code === stateCode);

    if (state) {
        res.json(state);
    } else {
        return res.status(400).send({ "message": "Invalid state abbreviation parameter"});
    }
};

module.exports = { getAllStates, getState };