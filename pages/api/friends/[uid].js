import {addFriend, deleteFriend, getFriends} from '../../../src/functions/friends'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {uid} = req.body
    const res = await deleteFriend(uid)
    return res.status(200).json("ok")
  }

  
  if (req.method === "GET") {
    const {query: {uid}} = req
    const data = await getFriends(uid)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json(data)    
  }
 

  if (req.method === "POST") {
    const {uid} = req.body
    const res = await addFriend(uid)
    return res.status(200).json("ok")
  }
}