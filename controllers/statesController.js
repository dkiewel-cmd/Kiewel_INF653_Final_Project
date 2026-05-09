const State = require('../model/State');
const statesData = require('../model/statesData.json');

const getAllStates = async (req, res, next) => {
    try {
        const mongoStates = await State.find();

        let results = statesData.map(jsonState => {
            const mongoData = mongoStates.find(ms => ms.stateCode === jsonState.code);

            if (mongoData && mongoData.funfacts && mongoData.funfacts.length > 0) {
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
        next(err);
    }
};

const getState = async (req, res, next) => {
    try {
        const codeParam = req.params.code.toUpperCase();
        const jsonState = statesData.find(s => s.code === codeParam);

        if (!jsonState) {
            return res.status(400).json({ "message": "Invalid state abbreviation parameter"});
        }
    
        const mongoState = await State.findOne({ stateCode: codeParam });

        if (mongoState && mongoState.funfacts && mongoState.funfacts.length >= 0) {
            return res.json({
                ...jsonState,
                funfacts: mongoState.funfacts
            });
        }

        res.json(jsonState);
    } catch (err) {
        next(err);
    }
};

const getRandomFunFact = async (req, res, next) => {
    const codeParam = req.params.code?.toUpperCase();
    const jsonState = statesData.find(s => s.code === codeParam);

    if (!jsonState) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    try {
        const mongoState = await State.findOne({ stateCode: codeParam });

        if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length === 0) {
            return res.status(404).json({ 
                "message": `No Fun Facts found for ${jsonState.state}` 
            });
        }

        const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
        res.json({ "funfact": randomFact });

    } catch (err) {
        next(err);
    }
};

const addFunFact = async (req, res, next) => {
    try {
        const codeParam = req.params.code?.toUpperCase();

        if (!req.body?.funfacts) {
            return res.status(400).json({ "message": "State fun facts value required" });
        }

        if (!Array.isArray(req.body.funfacts)) {
            return res.status(400).json({ "message": "State fun facts value must be an array"});
        }

        const state = await State.findOne({ stateCode: codeParam });

        if (!state) {
            return res.status(404).json({ "message": `No state found with code ${codeParam}` });
        }
        
        state.funfacts = state.funfacts || [];
        state.funfacts.push(...req.body.funfacts);

        const result = await state.save();
        res.status(201).json({
            _id: result._id,
            stateCode: result.stateCode,
            funfacts: result.funfacts,
            __v: result.__v
        });

    } catch (err) {
        next(err);
    }
};

const updateFunFact = async (req, res, next) => {
    try {
        const codeParam = req.params.code?.toUpperCase();
        const { index, funfact } = req.body;

        if (!index) {
            return res.status(400).json({ "message": "State fun fact index value required" });
        }
        if (!funfact) {
            return res.status(400).json({ "message": "State fun fact value required" });
        }

        const jsonState = statesData.find(s => s.code === codeParam);
        if (!jsonState) {
            return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
        }

        const state = await State.findOne({ stateCode: codeParam });

        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({ "message": `No Fun Facts found for ${jsonState.state}` });
        }

        const arrayIndex = index - 1;
        if (state.funfacts[arrayIndex] === undefined) {
            return res.status(404).json({ "message": `No Fun Fact found at that index for ${jsonState.state}` });
        }

        state.funfacts[arrayIndex] = funfact;
        const result = await state.save();
        res.json({
            _id: result._id,
            stateCode: result.stateCode,
            funfacts: result.funfacts,
            __v: result.__v
        });

    } catch (err) {
        next(err);
    }
};

const deleteFunFact = async (req, res, next) => {
    try {
        const codeParam = req.params.code?.toUpperCase();
        const { index } = req.body;

        if (!index) {
            return res.status(400).json({ "message": "State fun fact index value required" });
        }

        const jsonState = statesData.find(s => s.code === codeParam);
        if (!jsonState) {
            return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
        }

        const state = await State.findOne({ stateCode: codeParam });

        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({ "message": `No Fun Facts found for ${jsonState.state}` });
        }

        const arrayIndex = index - 1;
        if (state.funfacts[arrayIndex] === undefined) {
            return res.status(404).json({ "message": `No Fun Fact found at that index for ${jsonState.state}` });
        }

        state.funfacts.splice(arrayIndex, 1);

        const result = await state.save();
        res.json({
            _id: result._id,
            stateCode: result.stateCode,
            funfacts: result.funfacts,
            __v: result.__v
        });

    } catch (err) {
        next(err);
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
    updateFunFact,
    deleteFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission
};