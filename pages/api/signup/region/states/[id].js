const states = require("../../../../../data/state.json")

// Match query(country_id) to a state id
export default (req, res) => {
    const {query: {id}} = req
    const resStates = states.filter(x => x.country_id === id)
    res.status(200).json(resStates)
}