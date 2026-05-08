const State = require('../model/State');
const statesData = require('../model/statesData.json');

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
    const stateCode = req.params.state?.toUpperCase();
    const jsonState = statesData.find(s => s.code === stateCode);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    try {
        const mongoState = await State.findOne({ code: stateCode });

        if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length === 0) {
            return res.status(404).json({ 
                "message": `No Fun Facts found for ${jsonState.state}` 
            });
        }

        const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
        res.json({ "funfact": randomFact });

    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

const addFunFact = async (req, res) => {
    try {
        const stateCode = req.params.state?.toUpperCase();

        if (!req.body?.funfacts) {
            return res.status(400).json({ "message": "State fun facts value required." });
        }

        if (!Array.isArray(req.body.funfacts) || req.body.funfacts.length === 0) {
            return res.status(400).json({ "message": "State fun facts value must be an array."});
        }

        let state = await State.findOne({ code: stateCode });

        if (!state) {
            return res.status(404).json({ "message": `No state found with code ${stateCode}` });
        }
        
        state.funfacts = state.funfacts || [];
        state.funfacts.push(...req.body.funfacts);

        const result = await state.save();
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

const updateFunFact = async (req, res) => {
    const stateCode = req.params.state?.toUpperCase();
    const { index, funfact } = req.body;

    if (!index) return res.status(400).json({ "message": "State fun fact index value required" });
    if (!funfact) return res.status(400).json({ "message": "State fun fact value required" });

    const jsonState = statesData.find(s => s.code === stateCode);
    if (!jsonState) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    try {
        const state = await State.findOne({ code: stateCode });

        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({ "message": `No Fun Facts found for ${jsonState.state}` });
        }

        const arrayIndex = index - 1;
        if (arrayIndex < 0 || arrayIndex >= state.funfacts.length) {
            return res.status(404).json({ "message": `No Fun Fact found at that index for ${jsonState.state}` });
        }

        const updateKey = `funfacts.${arrayIndex}`;
        const result = await State.findOneAndUpdate(
            { code: stateCode },
            { $set: { [updateKey]: funfact } },
            { new: true } 
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

const deleteFunFact = async (req, res) => {
    const stateCode = req.params.state?.toUpperCase();
    const { index } = req.body;

    if (!index) {
        return res.status(400).json({ "message": "State fun fact index value required" });
    }

    try {
        const mongoState = await State.findOne({ code: stateCode });
        const jsonState = statesData.find(s => s.code === stateCode);

        if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length === 0) {
            return res.status(404).json({ 
                "message": `No Fun Facts found for ${jsonState.state}` 
            });
        }

        const arrayIndex = index - 1;
        if (mongoState.funfacts[arrayIndex] === undefined) {
            return res.status(404).json({ 
                "message": `No Fun Fact found at that index for ${jsonState.state}` 
            });
        }

        mongoState.funfacts.splice(arrayIndex, 1);
        
        const result = await mongoState.save();

        res.json(result);

    } catch (err) {
        res.status(500).json({ "message": err.message });
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
    getStateAdmission,
    updateFunFact,
    deleteFunFact
};