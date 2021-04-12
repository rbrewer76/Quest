import {createContext, useState} from 'react'
import Gameboard from './Gameboard'
import Sidebar from './sidebar/Sidebar'
export const PlayerMobContext = createContext()
export const DisplayContext = createContext()

const PlayMain = () => {
  const [showStats, setShowStats] = useState(false)  
  const [showEq, setShowEq] = useState(false)
  const [showInventory, setShowInventory] = useState(false)    
  const [showGroup, setShowGroup] = useState(true)  

  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [selectedMob, setSelectedMob] = useState("")    

  return (
    <>
      <div id="play-wrap">
        <PlayerMobContext.Provider value={{selectedPlayer, setSelectedPlayer, selectedMob, setSelectedMob}}>    
          <DisplayContext.Provider value={{showStats, setShowStats, showEq, setShowEq, showInventory, setShowInventory, showGroup, setShowGroup}}>      
            <Sidebar />
            <Gameboard />
          </DisplayContext.Provider>  
        </PlayerMobContext.Provider>          
      </div>
      <style jsx>{`
        #play-wrap {
          display: flex;
          height: 100vh;
          max-height: 100vh;
          width: 100%;
          color: white;
          font-size: 20px;                     
          background-color: black;        
        }
      `}</style>
    </>
  )
}

export default PlayMain