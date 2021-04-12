const countries = require("../../../../data/country.json")

export default (req, res) => {

  res.status(200).json(countries)
}
