import {deleteItem, getItem} from '../../../src/functions/items'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {id} = req.body
    deleteItem(id)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json("ok")      
  }

  if (req.method === "GET") {
    const {query: {id}} = req    
    const data = await getItem(id)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json(data)      
  }

}