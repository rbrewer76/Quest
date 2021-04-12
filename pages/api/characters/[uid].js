import {getCharacters} from '../../../src/functions/characters'

export default async(req, res) => {
  const {query: {uid}} = req
  const data = await getCharacters(uid)
    .catch(error => {
      res.json(error)
      res.status(405).end()
    })
  return res.status(200).json(data)    
}