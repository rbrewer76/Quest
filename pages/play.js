/*  This component is responsible for the initial loading of game state.
 *
 *  A stream of the player's character is initiated and it's initial data saved to the store. 
 *  After the player character is saved, other states have their streams setup and saved to 
 *  their store.
*/

import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {useRouter} from 'next/router'
import {useRequireAuth} from '../src/hooks/useRequireAuth'
import {pcState} from '../src/store/store-pc'
import {inventoryState} from '../src/store/store-inv'
import {groupState, groupCharactersState} from '../src/store/store-group'
import {getCharacter} from '../src/fetch/character'
import {addCharacterToRoom} from '../src/functions/rooms'
import {streamPC, streamInventory, streamGroup, streamCharacters} from '../src/functions/streams'
import Layout from '../src/components/Layout'
import PlayMain from '../src/components/gameboard/PlayMain'

const Play = () => {
  const [pc, setPc] = useRecoilState(pcState)
  const [inv, setInv] = useRecoilState(inventoryState)  
  const [group, setGroup] = useRecoilState(groupState)    
  const [groupCharacters, setGroupCharacters] = useRecoilState(groupCharactersState)        
  
  const auth = useRequireAuth()
  const router = useRouter()

  // Add the player to the currentroom upon entering the game
  useEffect(() => {
    if (pc)
      addCharacterToRoom(pc.cid, pc.name, pc.currentroom)      
  }, [pc.cid])


  // read sessionStorage for cid to reload currently played character
  useEffect(async () => {
    if (pc.cid === undefined) {
      const data = sessionStorage.getItem("cid")
      if (data) 
        setPc(await getCharacter(data))
      else 
        return router.push('/dash')
    }
  }, [])

  
   // Setup real-time db stream for the pc
   useEffect(() => { 
    if (pc.cid) {
      const unsubscribe = streamPC(pc.cid, {
        next: querySnapshot => {
          const updatedPC = querySnapshot.data()
          if (updatedPC)
            setPc(updatedPC)
        }
      })
      return () => unsubscribe()
    }
    // pc.cid allows update after a reload of page and charcater is loaded from Session Storage
    // setPc allows update again after any setting of pc state    
  }, [pc.cid, setPc])   

    
   // Setup real-time db stream for the pc's inventory
   useEffect(() => { 
    if (pc.inventory) {
      const unsubscribe = streamInventory(pc.inventory, {
        next: querySnapshot => {
          const updatedInv = querySnapshot.data()
          if (updatedInv)
            setInv(updatedInv)
        }
      })
      return () => unsubscribe()
    }
  // pc.inventory allows update after a reload of page and charcater is loaded from Session Storage
  // setInv allows update again after any setting of pc state  
  }, [pc.inventory, setInv])   


  // Update the group and groupCharacters state after the pc leaves the group
  useEffect(async () => {
    if (!pc.gid) {
      setGroup("")
      setGroupCharacters([])    
    }
  }, [pc.gid])  


    // Setup real-time db stream for the group
    useEffect(() => { 
      if (pc.gid) {
        const unsubscribe = streamGroup(pc.gid, {
          next: querySnapshot => {
            const updatedGroup = querySnapshot.data()
            if (updatedGroup) 
              setGroup(updatedGroup)
          }
        })
        return () => unsubscribe()
      }
    // group.gid allows update after reload of page 
    // setGroup allows update again after any setting of group state    
  }, [pc.gid, setGroup])    
  
  
  // setup stream for each character in the group minus the pc
  useEffect(() => {
    if (group.gid) {
      const groupMembers = group.players.filter(x => x.cid !== pc.cid).map(x => x.cid)
      if (groupMembers.length > 0) {
        const unsubscribe = streamCharacters(groupMembers, {
          next: querySnapshot => {
            const updatedGroupCharacters = []
            querySnapshot.forEach((doc) => {
              updatedGroupCharacters.push(doc.data())
            })
            if (updatedGroupCharacters.length > 0)
              setGroupCharacters(updatedGroupCharacters)
          }
        })
        return () => unsubscribe()
      }
      if (groupMembers.length === 0)
        setGroupCharacters([])
    }
  // group.players allows update after change in group makeup
  // setGroupCharacters allows update after setting  of groupCharacter state    
  }, [group.players, setGroupCharacters])  

  return (
    <>
      <Layout>
        {pc.cid && <PlayMain />}
      </Layout>
    </>
  )
}


export default Play