const cities = require("../../../../../data/city.json")

// Match query(state_id) to a city id
export default (req, res) => {
    const {query: {id}} = req
    const resCities = cities.filter(x => x.state_id === id)
    res.status(200).json(resCities)
}