/*  API calls related to items
 *  There is no call to create an item, as of now, the client should never have the ability 
 *  to create an item. 
 */ 

// Simply delete item
export const deleteItem = async (id) => {
  const res = await fetch("../api/item/" + id, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      id: id
    })   
  })
  return res
}


// Remove item from character's inventory, then delete it
export const destroyItem = async (cid, id) => {
  const res = await fetch("../api/character/inventory/" + id, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      id: id
    })   
  })
  return res
}


export const dropItem = async (cid, id) => {
  const res = await fetch("../api/room/item/" + id, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      id: id,
    })   
  })
  return res
}


export const equipItem = async (cid, id, slot) => {
  const res = await fetch("../api/item/equip/" + id, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      id: id,
      slot: slot
    })   
  })
  return res
}


export const getItem = async (id) => {
  const res = await fetch("../api/item/" + id, 
  {
    method: "GET"
  })
    .then(response => response.json() )
  return res
}


export const takeItem = async (cid, id) => {
  const res = await fetch("../api/room/item/" + id, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      id: id,
    })   
  })
  return res
}


export const unequipItem = async (cid, id, slot) => {
  const res = await fetch("../api/item/equip/" + id, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      id: id,
      slot: slot
    })   
  })
  return res  
}