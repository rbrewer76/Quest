import {addCharacterToRoom, removeCharacterFromRoom} from '../../../../src/functions/rooms'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {cid, name, rid} = req.body
    removeCharacterFromRoom(cid, name, rid)
    res.status(200).json("ok")
  }

  if (req.method === "POST") {
    const {cid, name, rid} = req.body
    addCharacterToRoom(cid, name, rid)
    res.status(200).json("ok")
  }
}