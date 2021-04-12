import {db} from '../../../../config/firebase'
import {dropItem, takeItem} from '../../../../src/functions/items'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {cid, id} = req.body
    const char = await db.collection("characters").doc(cid)
      .get()
      .then(response =>  response.data())
    await takeItem(char.inventory, id, char.currentroom)
    res.status(200).json("ok")
  }

  if (req.method === "POST") {
    const {cid, id} = req.body
    const char = await db.collection("characters").doc(cid)
      .get()
      .then(response =>  response.data())
    await dropItem(char.inventory, id, char.currentroom)
    res.status(200).json("ok")
  }

}