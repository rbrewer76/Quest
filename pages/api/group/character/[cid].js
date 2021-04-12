import {addGroupCharacter, getGroupCharacter, leaveGroup, removeGroupCharacter} from '../../../../src/functions/group'

export default async (req, res) => {

  // Remove character from the group when they leave
  if (req.method === "DELETE") {
    const {cid, gid} = req.body
    await leaveGroup(cid, gid)
      .then(res.status(200).json("ok"))
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })   
  }

  // Get a character from a group and return its data
  if (req.method === "GET") {
    const {query: {cid}} = req
    const data = await getGroupCharacter(cid)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })
    return res.status(200).json(data)       
  }


  // Add character to the group
  if (req.method === "POST") {
    const {cid, gid, nid} = req.body
    addGroupCharacter(cid, gid, nid)
    return res.status(200).json("ok")     
  }


  // Group leader can remove a different character from the group
  if (req.method === "PUT") {
    const {cid, gid} = req.body
    // remove character from group array
    await removeGroupCharacter(cid, gid)
      .then(res.status(200).json("ok"))
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })   
  }
}