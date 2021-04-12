import {db} from '../../config/firebase'

// API function only - Do not call from client
export const declineNotification = (nid) => {
  // delete the notification
  db.collection('notifications').doc(nid).delete()
}


// API function only - Do not call from client
// Sends notification to player to join group
export const requestGroupNotification = (cid, gid, name) => {
  // check if already notification
  db.collection("notifications")
    .where("cid", "==", cid)
    .where("type", "==", "group")
    .where("gid", "==", gid)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        // create notification to cid to accept or decline only if there isnt one already
        db.collection("notifications")
          .add({})
          .then(response => {
            db.collection("notifications").doc(response.id)
              .set({nid: response.id, cid: cid, gid: gid, name: name, type: "group"})
          })
      }
    })
}