const State = require('../model/State');
const data = {
    states: require('../model/statesData.json')
};

const getAllStates = async (req, res) => {
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

const getRandomFunFact = async (req, res) => {
    try {
        const stateCode = req.params.code.toUpperCase();
        const state = await State.findOne({ code: stateCode });
        const stateName = req.params.state;

        if (!state) {
            return res.status(404).json({ "message": "State not found" });
        }

        if (!state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({
                "message": `No Fun Facts found for ${stateName}`
            });
        }

        const randomIndex = Math.floor(Math.random() * state.funfacts.length);
        const randomFact = state.funfacts[randomIndex];

        res.json({ "funfact": randomFact });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

const addFunFact = async (req, res) => {
    try {
        const stateCode = req.params.code.toUpperCase();
        const { funfact } = req.body;

        if (!funfact) {
            return res.status(400).json({ "message": "State fun fact value required" });
        }

        const updatedState = await State.findOneAndUpdate(
            { code: stateCode },
            { $push: { funfacts: funfact } },
            { new: true }
        );

        if (!updatedState) {
            return res.status(404).json({ "message": "State not found " });
        }

        res.json(updatedState);
    } catch (err) {
        res.status(500).json({ "message": error.message });
    }
};

module.exports = { getAllStates, getState, getRandomFunFact, addFunFact };