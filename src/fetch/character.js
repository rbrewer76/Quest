// delete a single character with the passed cid
export const deleteCharacter = async (cid) => {
  const res = await fetch("../api/character/" + cid,
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid
    })    
  }) 
  .then(response => response)  
  .catch(error => console.log(error))  
  return res
}


//create a new character for a user with the passed uid
export const createCharacter = async (uid, name, currentClassName, classId, portraitId) => {
  const res = await fetch("../api/user/character/" + uid, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      uid: uid,
      name: name,
      cname: currentClassName,
      pic: `/img/creation/portrait/${classId}/${portraitId}.png`   
    })
  })
  .then(response => response.status)  
  .catch(error => console.log(error))
  return res
}


// gets a single character from the passed cid
export const getCharacter = async (cid) => {
  const res = await fetch("../api/character/" + cid,
  {
    method: "GET"    
  }) 
  .then(response => response.json())  
  .catch(error => console.log(error))
  return res
}


// sets a character's data to data passed in.
// passed data should be a collection of key/value pairs
export const setCharacter = (cid, data) => {
  fetch("../api/character/" + cid, 
  {
    method: "PUT",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      data: data
    })
  })  
}