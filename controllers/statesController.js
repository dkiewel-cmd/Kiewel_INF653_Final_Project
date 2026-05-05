const data = {
    states: require('../model/statesData.json')
    //setFunFact: function (data) {[ this.funfact = data ]}
};

const getAllStates = (req, res) => {
    res.json(data.states);
}

/*const createNewFunFact = (req, res) => {
    const newFunFact = {
        funfact: data.states[data.states.funfact.length - 1].funfact + 1 || 1,
    }

    data.setFunFact([...data.states.funfact, newFunFact]);
    res.status(201).json(data.states);
        //states/NE/funfact endpoint POST request should return a JSON object.‣
        //states/OR/funfact endpoint POST request should return a JSON object with 4 properties.‣
        //states/OR endpoint GET request should provide BOTH fun facts that were posted in the previous test.‣
        //states/TX/funfact endpoint POST request will return a message saying 'State fun facts value required' if no funfacts are in the body of the request.‣
        //states/UT/funfact endpoint POST request will return a message saying 'State fun facts value must be an array' if funfacts are not provided in an array.‣
        //states/KS/funfact endpoint POST request should not overwrite pre-existing fun facts
    
}*/

/*const updateFunFact = (req, res) => {
    res.json({
        "state": req.body.state
        //states/NE/funfact endpoint PATCH request should update the fun fact at the provided index property. REMEMBER: Provided indexes should start a 1, not zero.‣
        //states/NE/funfact endpoint PATCH request should return a JSON object with 4 properties and represent the updated data. REMEMBER: Provided indexes should start a 1, not zero.‣
        //states/MI/funfact endpoint PATCH request will return a message saying 'State fun fact index value required' if no index is provided in the body of the request.‣
        //states/CT/funfact endpoint PATCH request will return a message saying 'State fun fact value required' if a funfact property is not provided with a string value.‣
        //states/AZ/funfact endpoint PATCH request will return a message saying 'No Fun Facts found for Arizona' if no funfacts exist to update.‣
        //states/KS/funfact endpoint PATCH request will return a message saying 'No Fun Fact found at that index for Kansas' if no fun fact exists to update at the provided index.

    });
}

const deleteFunFact = (req, res) => {
    res.json({ "funfact": req.body.funfact });
    //states/NE/funfact endpoint DELETE request should delete the fun fact at the provided index property. REMEMBER: Provided indexes should start a 1, not zero.‣
    //states/OR/funfact endpoint DELETE request should return a JSON object with 4 properties and represent the updated data. REMEMBER: Provided indexes should start a 1, not zero.‣
    //states/WY/funfact endpoint DELETE request will return a message saying 'State fun fact index value required' if no index is provided in the body of the request.‣
    //states/MT/funfact endpoint DELETE request will return a message saying 'No Fun Facts found for Montana' if no funfacts exist to delete.‣
    //states/CO/funfact endpoint DELETE request will return a message saying 'No Fun Fact found at that index for Colorado' if no fun fact exists to delete at the provided index.‣
    //Cleaning up what the tests may have added to your data (if your GET and DELETE endpoints work). Bonus point!
}

const getStateByCode = (req, res) => {
    res.json({ "code": req.params.state });
}*/

module.exports = {
    getAllStates/*,
    createNewFunFact,
    updateFunFact,
    deleteFunFact,
    getStateByCode
    // there will be more...*/
}