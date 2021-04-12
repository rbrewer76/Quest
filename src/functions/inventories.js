import {db} from '../../config/firebase'
import {deleteItem} from '../functions/items'

// API function only - Do not call from client
// Create an inventory and assign it to the character on character creation
export const createInventory = async (cid) => {
  let id = ""
  await db.collection("inventories")
    .add({})
    .then(response => {
      id = response.id
      db.collection("inventories").doc(id)
        .set({
          id: id,
          cid: cid,
          items: []
        })
    })
  return id
} 


// API function only - Do not call from client
// Delete a character's inventory and all it's owned items when that character is deleted
export const deleteInventory = async (id) => {
  // Delete all items in invetory first
  const res = await db.collection("inventories").doc(id)
    .get()
    .then(response => response.data())
  res.items.map(x => deleteItem(x))

  // Delete the provided character's inventory
  db.collection("inventories").doc(id)
    .delete()
}