export const getRoom = async (rid) => {
  const res = await fetch("../api/room/" + rid) 
    .then(response => response.json())  
    .catch(error => console.log(error))
  return res
}


export const addCharacterToRoom = async (cid, name, rid) => {
  await fetch("../api/room/character/" + rid, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      name: name,
      rid: rid
    })
  })   
  .catch(error => console.log(error))
  return "ok"
}


export const removeCharacterFromRoom = async (cid, name, rid) => {
  await fetch("../api/room/character/" + rid, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      name: name,
      rid: rid
    })
  })  
  .catch(error => console.log(error))
  return "ok"
}