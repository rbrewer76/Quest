import {changeGroupLeader, createGroup, getGroup} from '../../../src/functions/group'

export default async (req, res) => {

  if (req.method === "GET") {
    const {query: {gid}} = req
    await getGroup(gid)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })  
    return res.status(200).json(data)        
  }


  if (req.method === "POST") {
    const {cid} = req.body
    const data = await createGroup(cid)
      .catch(error => {
        res.json(error)
        res.status(405).end()
      })    
      res.status(200).json(data)
  }


   if (req.method === 'PUT') {
    const {cid, gid} = req.body     
    changeGroupLeader(cid, gid)
    res.status(200).json("ok")
  }

}