const State = require('../model/State');
const data = require('../model/statesData.json');

const getAllStates = async (req, res) => {
    try {
        const mongoStates = await State.find();

        let results = statesData.map(jsonState => {
            const mongoData = mongoStates.find(ms => ms.code === jsonState.code);

            if (mongoData && mongoData.funfacts) {
                return { ...jsonState, funfacts: mongoData.funfacts };
            }
            return jsonState;
        });

        const { contig } = req.query;
        const nonContig = ['AK', 'HI'];

        if (contig === 'true') {
            results = results.filter(s => !nonContig.includes(s.code));
        } else if (contig === 'false') {
            results = results.filter(s => nonContig.includes(s.code));
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getState = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
    }

    try {
        const mongoState = await State.findOne({ code: stateCode });

        if (mongoState && mongoState.funfacts) {
            return res.json({
                ...jsonState,
                funfacts: mongoState.funfacts
            });
        }

        res.json(jsonState);
    } catch (err) {
        res.status(500).json({ "message": err.message });
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

const getStateCapital = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": jsonState.state, "capital": jsonState.capital_city });
};

const getStateNickname = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": jsonState.state, "nickname": jsonState.nickname });
};

const getStatePopulation = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": jsonState.state, "population": jsonState.population.toLocaleString() });
};

const getStateAdmission = async (req, res) => {
    const stateCode = req.params.code.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": jsonState.state, "admitted": jsonState.admission_date });
};

module.exports = {
    getAllStates,
    getState,
    getRandomFunFact,
    addFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
};