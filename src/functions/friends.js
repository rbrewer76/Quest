import {db} from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {getCharacters} from '../functions/characters'

export const addFriend = async (uid) => {
  const res = await db.collection('users').doc(uid)
  .update({friends: firebase.firestore.FieldValue.arrayUnion(uid)})
  return res
}


export const deleteFriend = async (uid) => {
  const res = await db.collection('users').doc(uid)
  .update({friends: firebase.firestore.FieldValue.arrayRemove(uid)})
  return res
}


// API function only - Do not call from client
// gets the player's friends array of cid
export const getFriends = async (uid) => {
  let friendsInfo = []  
  const user = await db.collection('users').doc(uid)
    .get()
    .then(response => response.data())    

  if (user.friends.length > 0) {
    // get the users info
    const friends = await db.collection('users').where('uid', 'in', user.friends)
      .get()
    // Destructure to keep only fields needed for the friends list
    friends.forEach(x => friendsInfo.push((({uid, displayName, friends}) => 
    ({uid, displayName, friends}))(x.data())))
  }
  return friendsInfo
}


// API function only - Do not call from client
// get the friend's characters
export const getFriendCharacters = async (uid) => {
  const char = await getCharacters(uid)
  
  // Destructure to keep only fields needed for the friends list
  return char.map(x => ((({uid, cid, name, lvl, cname, pic, online}) => 
  ({uid, cid, name, lvl, cname, pic, online}))(x)))
}