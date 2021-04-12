// gets an array of all charcaters belonging to the passed uid
export const getCharacters = async (uid) => {
  const res = await fetch("../api/characters/" + uid) 
  .then(response => response.json())  
  .catch(error => console.log(error))
  return res
}


