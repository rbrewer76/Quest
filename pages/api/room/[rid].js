export default async (req, res) => {


  if (req.method === "GET") {
    const {query: {rid}} = req

    const location = require('../../../data/regions/4.json').room.find(x => x.rid === rid) 
    const region = require('../../../data/regions/4.json').region

    const combined = {...location, region}
    res.status(200).json(combined)
  }
}