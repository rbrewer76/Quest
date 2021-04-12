import {db} from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

// API function only - Do not call from client
export const addGroupCharacter = (cid, gid, nid) => {
  // add the gid to the player's gid
  db.collection('characters').doc(cid)
    .update({gid: gid})
  // add the player's cid to the group's player array
  db.collection('groups').doc(gid)
    .update({players: firebase.firestore.FieldValue.arrayUnion({cid: cid})})
  // delete the notification
  db.collection('notifications').doc(nid).delete()  
}


// API function only - Do not call from client
export const changeGroupLeader = (cid, gid) => {
  db.collection('groups').doc(gid)
    .update({leader: {cid: cid}})
}


// API function only - Do not call from client
export const createGroup = async (cid) => {
  let gid = ""
  let data = ""
  await db.collection("groups")
  .add({})
  .then(async response => {
    gid = response.id
    await db.collection("groups").doc(response.id)
      .set({
        gid: response.id,
        leader: {cid: cid},
        players: [{cid: cid}]
      })
    // add the gid to the character    
    await db.collection("characters").doc(cid)
      .update({gid: response.id})    
  })
  // get the new group object and send back
  .then(async () => {
    await db.collection('groups').doc(gid)
      .get()
      .then(response => data = response.data())
  })
  return data
}


// API function only - Do not call from client
export const getGroup = async (gid) => {
  const res = await db.collection('groups').doc(gid)
    .get()
    .then(response => {
      if (response.exists) 
        res.status(200).json(response.data())
    })
  return res
}


// API function only - Do not call from client
export const getGroupCharacter = async (cid) => {
  const res = await db.collection('characters').doc(cid)
  .get()
  .then(response => {
    if (response.exists) {
      // Destructure to keep only needed group character fields
      const modifiedChar = (({ uid, cid, name, lvl, cname, pic, hp }) => 
        ({ uid, cid, name, lvl, cname, pic, hp }))(response.data())
      res.status(200).json(modifiedChar)
    }
  })
  return res
}


// API function only - Do not call from client
// Player leaves the group
export const leaveGroup = async (cid, gid) => {
  await db.collection('groups').doc(gid)
    .update({players: firebase.firestore.FieldValue.arrayRemove({cid: cid})})
    .then(() => {
      // check if we still have a group
      db.collection('groups').doc(gid)
        .get()
        .then(response => {
          let tempDoc = response.data()
          if (tempDoc.players.length === 0) {
            // if no one left in the group, delete group              
            db.collection('groups').doc(gid)
              .delete()
              .catch(error => {
                console.log(error)
              })                
          }
          else {
            // if leader, make new leader
            if (tempDoc.leader.cid === cid) {
              db.collection('groups').doc(gid)
                .update({
                  leader: {cid: tempDoc.players[0].cid}
                })
                .catch(error => {
                  res.json(error)
                })   
            }
          }
        })
      })
  // remove gid from character
  await db.collection('characters').doc(cid)
    .update({gid: ""})
}


// API function only - Do not call from client
// Group leader removes a character from the group
export const removeGroupCharacter = async (cid, gid) => {
  await db.collection('groups').doc(gid)
    .update({players: firebase.firestore.FieldValue.arrayRemove({cid: cid})})
    .then(async () => {
      // remove gid from character
      await db.collection('characters').doc(cid)
        .update({gid: ""})
    })
}