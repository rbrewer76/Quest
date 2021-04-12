import {createCharacter} from '../../../../src/functions/character'


// Create a new character for the provided user
export default async (req, res) => {
  if (req.method === "POST") {
    const {uid, name, cname, pic} = req.body
    await createCharacter(uid, name, cname, pic)
      .then(response => res.status(200).json(response))
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })      
  } 
  else {
    res.json(error)
    res.status(405).end()
  }
}