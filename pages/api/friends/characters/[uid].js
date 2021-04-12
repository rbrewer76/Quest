import {getFriendCharacters} from '../../../../src/functions/friends'

export default async (req, res) => {

  if (req.method === "GET") {
    const {query: {uid}} = req
    const data = await getFriendCharacters(uid)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json(data)    
  }
} 
