export const changeGroupLeader = (cid, gid) => {
  fetch("../api/group/" + cid, 
  {
    method: "PUT",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      gid: gid
    })
  }) 
  .catch(error => console.log(error))  
}


export const createGroup = async (cid, gid) => {
  if (!gid) {
    const res = await fetch("../api/group/" + cid, 
    {
      method: "POST",
      headers: {"Content-Type":'application/json'},
      body: JSON.stringify({
        cid: cid
      })
    }) 
    .then(response => response.json())  
    .catch(error => console.log(error))
    return res
  }
}


export const getGroup = async (gid) => {
  const res = await fetch("../api/group/" + gid) 
    .then(response => response.json())  
    .catch(error => console.log(error))
  return res
}


export const getGroupCharacter = async (cid) => {
  const res = await fetch("../api/group/character/" + cid,
  {
    method: "GET"
  }) 
    .then(response => response.json())  
    .catch(error => console.log(error))
  return res
}


export const addGroupCharacter = (cid, gid, nid) => {
  fetch("../api/group/character/" + cid, {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      gid: gid,
      nid, nid
    })
  }) 
  .catch(error => console.log(error))   
}


// Player leaves the group
export const leaveGroup = (cid, gid) => {
  if (gid) {
    fetch("../api/group/character/" + cid, {
      method: "DELETE",
      headers: {"Content-Type":'application/json'},
      body: JSON.stringify({
        cid: cid,
        gid: gid
      })
    }) 
    .catch(error => console.log(error))    
  }
}


// Group leader removes a character from the group
export const removeGroupCharacter = (cid, gid) => {
  fetch("../api/group/character/" + cid, {
    method: "PUT",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      gid: gid
    })
  }) 
  .catch(error => console.log(error))    
}