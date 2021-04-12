export const addFriend = async (uid) => {
  const res = await fetch("../api/user/friend/" + uid, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      uid: uid,
    })
  })
  .then(response => response.status)  
  .catch(error => console.log(error))
  return res
}


export const deleteFriend = async (uid) => {
  const res = await fetch("../api/user/friend/" + uid, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      uid: uid,
    })
  })
  .then(response => response.status)  
  .catch(error => console.log(error))
  return res
}


export const getFriendCharacters = async (uid) => {
  const res = await fetch("../api/friends/characters/" + uid,
  {
    method: "GET"    
  }) 
    .then(response => response.json())  
    .catch(error => console.log(error))
  return res
}


// gets the player's friends array of cid
export const getFriends = async (uid) => {
  const res = await fetch("../api/friends/" + uid,
  {
    method: "GET"    
  }) 
    .then(response => response.json())  
    .catch(error => console.log(error))
  return res
}