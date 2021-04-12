import {db} from '../../config/firebase'

export const streamPC = (cid, observer) => {
  return db.collection('characters').doc(cid)
      .onSnapshot(observer)
}


export const streamGroup = (gid, observer) => {
  return db.collection('groups').doc(gid)
      .onSnapshot(observer)
}


// takes an array of cid
export const streamCharacters = (cid, observer) => {
  return db.collection('characters').where("cid", "in", cid)
      .onSnapshot(observer)
}


// takes an array of cid
export const streamFriendCharacters = (cid, observer) => {
  const reduceChars = (chars) => {
    return chars.map(x => ((({uid, cid, name, lvl, cname, pic, online}) => 
    ({uid, cid, name, lvl, cname, pic, online}))(x)))
  }

  return db.collection('characters').where("cid", "in", cid)
    .onSnapshot(observer => {
      const updatedFriendCharacters = []      
      observer.forEach((doc) => {
        updatedFriendCharacters.push(doc.data())
      })
      reduceChars(updatedFriendCharacters)
    })
}


/*
// takes an array of cid
export const streamFriendCharacters = (cid, observer) => {
  return db.collection('characters').where("cid", "in", cid)
    .onSnapshot(observer)
}
*/

// streams a room's persistant data
export const streamRoom = (rid, observer) => {
  return db.collection('rooms').doc(rid)
      .onSnapshot(observer)
}


// streams a character's inventory 
export const streamInventory = (id, observer) => {
  return db.collection('inventories').doc(id)
      .onSnapshot(observer)
}


export const streamNotifications = (cid, observer) => {
  return db.collection('notifications').where("cid", "==", cid)
      .onSnapshot(observer)
}