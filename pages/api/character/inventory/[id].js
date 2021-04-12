import {db} from '../../../../config/firebase'
import {deleteItem, removeItemFromPlayerInv} from '../../../../src/functions/items'

export default async (req, res) => {

  if (req.method === "DELETE") {
    const {cid, id} = req.body
    const char = await db.collection("characters").doc(cid)
      .get()
      .then(response => response.data())

    await removeItemFromPlayerInv(char.inventory, id)
    await deleteItem(id)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json("ok")      
  }

}