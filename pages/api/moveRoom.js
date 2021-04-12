import {db} from '../../config/firebase'
import {addCharacterToRoom, removeCharacterFromRoom} from '../../src/functions/rooms'
const region = require('../../data/regions/4.json')

export default async (req, res) => {
  const {cid, dir} = req.body

  const playerIsOkToTravel = (player) => {
    // test the player skills vs mods

    return true
  }

  if (req.method === 'POST') {
    // Get the player's current room
    await db.collection('characters').doc(cid)
      .get()
      .then(doc => doc.data())
      .then(async data => {
        const player = data
        const currentroom = player.currentroom

        //get the player's current room exits
        const exits = region.room.find(x => x.rid === currentroom).exits
        const exit = await exits.find(x => x.dir === dir)

        // update the player's currentroom if ok to move
        if (playerIsOkToTravel(player)) {   
          await db.collection('characters').doc(cid)
            .update({currentroom: exit.rid})
            .then(async () => {
              // remove the player from their previous room's player array 
              removeCharacterFromRoom(player.cid, player.name, player.currentroom)
              // add the player to the new room's player array
              addCharacterToRoom(player.cid, player.name, exit.rid)
              //get the player's group info if in one
              if (player.gid) {
                await db.collection('groups').doc(player.gid)
                  .get()
                  .then(doc => doc.data())
                  .then(data => {
                    // get player's group characters if leader
                    if (player.cid === data.leader.cid) {
                      const groupPlayers = data.players.filter(x => x.cid !== cid)
                      // get each of the player's group character info
                      groupPlayers.map(async x => {
                        await db.collection('characters').doc(x.cid)
                          .get()
                          .then(doc => doc.data())
                          .then(async data => {
                            const groupPlayerData = data
                            // only include characters that are: online, in lockstep and in the same room
                            if (groupPlayerData.online && groupPlayerData.grouplockstep && groupPlayerData.currentroom === currentroom) {                                  
                              if (playerIsOkToTravel(groupPlayerData)) {
                                // update the group character's currentroom
                                await db.collection('characters').doc(groupPlayerData.cid)
                                  .update({currentroom: exit.rid})
                                  .then(() => {
                                    // remove the player from their previous room's player array 
                                    removeCharacterFromRoom(groupPlayerData.cid, groupPlayerData.name, player.currentroom)
                                    // add the player to the new room's player array
                                    addCharacterToRoom(groupPlayerData.cid, groupPlayerData.name, exit.rid)
                                  })
                              }
                            }
                          })
                      })
                    }
                  })
              }
            })
        }
      })
      return res.status(200).json("ok") 
  }
  else return res.status(200).json(currentroom)  
}