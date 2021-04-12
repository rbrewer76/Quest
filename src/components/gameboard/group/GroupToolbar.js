import {useContext} from 'react'
import {PlayerMobContext} from '../PlayMain'
import {useRecoilValue, useRecoilState} from 'recoil'
import {pcState} from '../../../store/store-pc'
import {groupState, groupCharactersState} from '../../../store/store-group'
import {setCharacter} from '../../../fetch/character'
import {changeGroupLeader, createGroup, leaveGroup, removeGroupCharacter} from '../../../fetch/group'
import {requestGroupNotification} from '../../../fetch/notifications'
import ToolbarButton from '../../utility/toolbar/ToolbarButton'
import Toolbar from '../../utility/toolbar/Toolbar'

const GroupToolbar = () => {
  const pc = useRecoilValue(pcState)
  const [group, setGroup] = useRecoilState(groupState)  
  const groupCharacters = useRecoilValue(groupCharactersState)  
  const {selectedPlayer, setSelectedPlayer} = useContext(PlayerMobContext)
  
  let isLeader = false
  if (group)
    isLeader = pc.cid === group.leader.cid

  // Send add to group invite only if less than max size and player is not already in group
  const add = () => {
    if (group.players.length < 4 && !groupCharacters.find(x => x.cid === selectedPlayer))
      requestGroupNotification(selectedPlayer, pc.gid, pc.name)
  }

  const change = () => {
    if (selectedPlayer && selectedPlayer !== pc.cid)
      changeGroupLeader(selectedPlayer, pc.gid)
  }

  const create = async () => {
    if (!pc.gid)
      setGroup(await createGroup(pc.cid, pc.gid))
  }

  const leave = () => {
    leaveGroup(pc.cid, pc.gid)
  }

  const remove = () => {
    if (selectedPlayer !== pc.cid) {
      removeGroupCharacter(selectedPlayer, pc.gid)
      setSelectedPlayer("")
    }
  }

  return (
    <Toolbar>
      {!pc.gid && <ToolbarButton img={"/icons/group-start.png"} propFunction={() => create()} />}
      {group ? isLeader && group.players.length > 1 && <ToolbarButton img={"/icons/group-start.png"} propFunction={() => change()} /> : null}
      {group && !isLeader && <ToolbarButton img={"/icons/group-lockstep.png"} propFunction={() => setCharacter(pc.cid, {grouplockstep: !(pc.grouplockstep)})} />}       
      {group ? group.players.length < 4 && isLeader && <ToolbarButton img={"/icons/group-add.png"} propFunction={() => add()} /> : null}
      {group ? group.players.length > 1 && isLeader && <ToolbarButton img={"/icons/group-remove.png"} propFunction={() => remove()} /> : null}
      {pc.gid && <ToolbarButton img={"/icons/group-leave.png"} propFunction={() => leave()} />}
    </Toolbar>
  )
}


export default GroupToolbar