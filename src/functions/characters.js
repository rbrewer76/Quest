import {db} from '../../config/firebase'

// API function only - Do not call from client
// gets an array of all charcaters belonging to the passed uid
export const getCharacters = async (uid) => {
  const returnedChars = []    

  await db.collection('characters').where("uid", "==", uid) 
    .get()
    .then((response) => {
      response.forEach((doc) => returnedChars.push(doc.data()))
    })
    .then(() => {
      // sort alpha by character name
      returnedChars.sort((a, b) =>  {
        const A = a.name.toUpperCase()
        const B = b.name.toUpperCase()
        return (A < B) ? -1 : (A > B) ? 1 : 0
      })
    })
    return returnedChars    
}