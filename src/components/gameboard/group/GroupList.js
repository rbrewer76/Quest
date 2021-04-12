import {useRecoilValue} from 'recoil'
import {groupCharactersReducedStatsState} from '../../../store/store-group'
import PlayerCharacter from '../player/PlayerCharacter'

const GroupList = () => {
  const groupCharactersReducedStats = useRecoilValue(groupCharactersReducedStatsState)

  return (
    <>
      {groupCharactersReducedStats.map(x => <PlayerCharacter key={x.cid} char={x} />)}
    </>
  )
}


export default GroupList