import {useContext} from 'react'
import {DisplayContext} from './PlayMain'
import {useRecoilValue} from 'recoil'
import {pcState} from '../../store/store-pc'
import ConsoleMain from './console/ConsoleMain'
import PlayerCharacter from './player/PlayerCharacter'
import PlayerStats from './player/PlayerStats'
import PlayerEquipment from './player/PlayerEquipment'
import PlayerInventory from './player/PlayerInventory'
import GroupList from './group/GroupList'
import Skills from './player/Skills'
import StoryboardMain from './storyboard/StoryboardMain'

const Gameboard = () => {
  const pc = useRecoilValue(pcState)  
  const {showStats, showEq, showInventory, showGroup} = useContext(DisplayContext)

  return (
    <>
      <div id="gameboard-wrap">
        <div id="left-wrap">
          <div id="left-wrap-players">
            <div id="player-wrap">
              <PlayerCharacter char={pc} />
              <Skills /> 
            </div>
            <div id="group-wrap">
              {showGroup && <GroupList />} 
              {showStats && <PlayerStats />}
              {showEq && <PlayerEquipment />}            
              {showInventory && <PlayerInventory />}                  
            </div>
          </div>                            
          <ConsoleMain />
        </div>
        <div id="right-wrap">
          <StoryboardMain />   
        </div>

      </div>
      <style jsx>{`
          #gameboard-wrap {
            display: flex;
            padding: 5px;
            overflow: auto;
            min-width: calc(100vw - 79px);
          }
          #left-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: auto;
          }
          #left-wrap-players {
            display: flex;
            height: 100%;
            width: auto;
          }
          #player-wrap {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          #group-wrap {
            display: flex;
            flex-direction: column;            

            min-height: 586px;
            min-width: 460px;
          }
          #right-wrap {
            margin: 5px;            
            width: auto;
            max-width: 910px;
            border: solid 2px purple;
          }
        `}</style>            
    </>
  )
}

export default Gameboard 