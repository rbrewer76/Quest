import {db} from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

// API function only - Do not call from client
// A room's players array contains an object of the player's cid and name
export const addCharacterToRoom = async (cid, name, rid) => {
  await db.collection('rooms').doc(rid)
    .update({players: firebase.firestore.FieldValue.arrayUnion({cid: cid, name: name})})
  return "ok"
}

// API function only - Do not call from client
// A room's players array contains an object of the player's cid and name 
export const removeCharacterFromRoom = async (cid, name, rid) => {
  await db.collection('rooms').doc(rid)
    .update({players: firebase.firestore.FieldValue.arrayRemove({cid: cid, name: name})})
  return "ok"    
}


// API function only - Do not call from client
// A room's items array contains item objects
export const addItemToRoom = async (id, rid) => {
  await db.collection('rooms').doc(rid)
    .update({items: firebase.firestore.FieldValue.arrayUnion(id)})
  return "ok"
}


// API function only - Do not call from client
// A room's items array contains item objects
export const removeItemFromRoom = async (id, rid) => {
  await db.collection('rooms').doc(rid)
    .update({items: firebase.firestore.FieldValue.arrayRemove(id)})
  return "ok"
}