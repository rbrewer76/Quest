import {requestGroupNotification} from '../../../../src/functions/notifications'

export default (req, res) => {

  if (req.method === "POST") {
    const {cid, gid, name} = req.body
    requestGroupNotification(cid, gid, name)
    return res.status(200).json("ok")
  }

}