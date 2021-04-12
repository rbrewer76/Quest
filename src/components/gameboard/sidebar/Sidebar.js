import {useContext, useEffect, useState} from 'react'
import {DisplayContext} from '../PlayMain'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {pcState} from '../../../store/store-pc'
import {groupState, groupCharactersState} from '../../../store/store-group'
import GroupToolbar from "../group/GroupToolbar"
import ToolbarButton from '../../utility/toolbar/ToolbarButton'
import {setCharacter} from '../../../fetch/character'
import {removeCharacterFromRoom} from '../../../fetch/rooms'
import {changeGroupLeader} from '../../../fetch/group'

const Sidebar = () => {
  const [showGroupToolbar, setShowGroupToolbar] = useState(false)
  const {showStats, setShowStats, showInventory, setShowInventory, showEq, setShowEq, showGroup, setShowGroup} = useContext(DisplayContext)

  const [pc, setPc] = useRecoilState(pcState)
  const [group, setGroupState] = useRecoilState(groupState)
  const [groupCharacters, setGroupCharactersState] = useRecoilState(groupCharactersState)  

  const router = useRouter()  

  // Show group panel if no other panels open
  useEffect(() => {
    if (!showStats && !showInventory && !showEq) 
      setShowGroup(true)
  }, [showStats, showInventory, showEq, showGroup])

  // Exit game - save and load dashboard
  const quit = () => {
    setCharacter(pc.cid, {online: false})
    router.push('/dash')
    sessionStorage.removeItem("cid")
    // if group leader, change before leaving group, if others are online
    if (pc.gid) {
      if (pc.cid === group.leader.cid) {
        const newGroup = groupCharacters.filter(x => x.cid !== group.leader.cid && x.online === true)
        if (newGroup.length)
          changeGroupLeader(newGroup[0].cid, pc.gid)
      }
    }
    // reset game states to defaults  -  Move to seperate file/function
    setPc("")
    setGroupState("")
    setGroupCharactersState([])
    // remove character from room's player array
    removeCharacterFromRoom(pc.cid, pc.name, pc.currentroom)
  }

  const toggleStats = () => {
    setShowGroup(false)
    setShowStats(!showStats)
    setShowEq(false)
    setShowInventory(false)
  }

  const toggleEquipment = () => {
    setShowGroup(false)
    setShowStats(false)
    setShowEq(!showEq)
    setShowInventory(false)
  }

  const toggleInventory = () => {
    setShowGroup(false)
    setShowStats(false)
    setShowEq(false)
    setShowInventory(!showInventory)
  }

  return (
    <>
      <div id="sidebar-wrap">
        <ToolbarButton img={"/icons/left-arrows.svg"} propFunction={quit} />
        <div className="border"></div>
        <ToolbarButton img={"/icons/stats.png"} propFunction={toggleStats}/>        
        <ToolbarButton img={"/icons/equipment.png"} propFunction={toggleEquipment} />        
        <ToolbarButton img={"/icons/inventory.png"} propFunction={toggleInventory} />                        
        <div className="border"></div>        
        <ToolbarButton img={"/icons/addfriend.png"} />
        <ToolbarButton img={"/icons/group.png"} propFunction={() => setShowGroupToolbar(!showGroupToolbar)} />
        {showGroupToolbar && <GroupToolbar />}
      </div>
      <style jsx>{`
        #sidebar-wrap {
          padding: 5px;
          width: auto;
          border-right: solid 5px var(--orange1-color);
        }
        .border {
          margin: 5px 0;
          width: 100%;
          border-bottom: solid 1px lightgray;
        }
      `}</style>      
    </>
  )
}


export default Sidebar     