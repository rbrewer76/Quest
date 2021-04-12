import {deleteCharacter, getCharacter, setCharacter} from '../../../src/functions/character'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {cid} = req.body    
      await deleteCharacter(cid)
      .then(res.status(200).json("ok"))
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })    
  }


  else if (req.method === "GET") {
    const {query: {cid}} = req
    const data = await getCharacter(cid)
    .catch(error => {
      res.json(error)
      res.status(405).end()
    })  
    return res.status(200).json(data)    
  }


  // sets a character's data to data passed in.
  // passed data should be a collection of key/value pairs
  else if (req.method === "PUT") {
    const {cid, data} = req.body
    setCharacter(cid, data)
    res.status(200).json("ok")
  }
}