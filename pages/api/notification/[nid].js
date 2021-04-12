import {declineNotification} from '../../../src/functions/notifications'

export default async (req, res) => {
  
  if (req.method === "DELETE") {    
    const {nid} = req.body
    declineNotification(nid)
    return res.status(200).json("ok")
  }
}