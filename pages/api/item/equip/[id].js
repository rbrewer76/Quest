import {equipItem, unequipItem} from "../../../../src/functions/items"

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {cid, id, slot} = req.body
    unequipItem(cid, id, slot)
    .catch(error => console.log(error))
    .catch(error => {
      res.json(error)
      res.status(405).end()
    })    
    return res.status(200).json("ok")   
  }

  else if (req.method === "POST") {
    const {cid, id, slot} = req.body
    equipItem(cid, id, slot)
    .catch(error => console.log(error))
    .catch(error => {
      res.json(error)
      res.status(405).end()
    })    
    return res.status(200).json("ok")   
  }

}