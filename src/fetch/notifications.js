export const declineNotification = (nid) => {
  fetch("../api/notification/" + nid, 
  {
    method: "DELETE",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      nid: nid
    })
  })
}


export const requestGroupNotification = (cid, gid, name) => {
  fetch("../api/notification/group/" + gid, 
  {
    method: "POST",
    headers: {"Content-Type":'application/json'},
    body: JSON.stringify({
      cid: cid,
      gid, gid,
      name, name
    })
  }) 
}