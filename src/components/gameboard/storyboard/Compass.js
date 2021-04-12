import {useState} from 'react'
import {useRecoilValue} from 'recoil'
import {pcCidState} from '../../../store/store-pc'
import {roomExitsState} from '../../../store/store-room'

const Compass = () => {
  const exits = useRecoilValue(roomExitsState)  
  const directions = ["n", "e", "s", "w", "u", "d"]

  const getMods = (dir) => {
    let mods = ""
    const exit = (exits && exits.find(x => x.dir === dir)) 
    
    if (exit) {
      // eventually, player skills compare(perception vs hidden, etc) to mod value
      mods =  mods.concat(" available")    
      if (exit.hidden)
        mods =  mods.concat(" hidden")     // only see if skill is >=
      if (exit.locked)
        mods =  mods.concat(" locked")      
    }
    return mods
  }

  return (
    <>
      <div id="compass-wrap">
        {directions.map(dir => <CompassButton key={dir} id={dir} mods={getMods(dir)} exit={(exits && exits.find(exit => exit.dir === dir))} />)}
      </div>
      <style jsx>{`
        #compass-wrap {
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}


const CompassButton = (props) => {
  const {id, mods, exit} = props
  const [isMoving, setIsMoving] = useState(false)     // control time for lockstep characters to be updated
  const cid = useRecoilValue(pcCidState)

  const travel = async () => {
    // keep from firing another move before lockstep characters are moved
    setIsMoving(true)
    if (exit && !isMoving) {
      await fetch("../api/moveRoom/", {
        method: "POST",
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify({
          cid: cid,
          dir: exit.dir
        })
      })
      .catch(error => console.log(error))  
    }
    setIsMoving(false)    
  }

  return (
    <>
      <div id={id} className={"btn" + mods} onClick={() => travel()} >
        {id.toUpperCase()}
      </div>
      <style jsx>{`
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          height: 22px;
          width: 22px;
          opacity: .3;
          background-color: #303030;
        }      
        .available {
          color: var(--orange1-color) ;
          opacity: 1;
        }
        .hidden {
          color: lightblue;
          opacity: 1;          
        }
        .locked {
          color: red;
          opacity: 1;    
        }
        .hidden.locked {
          color: purple;
          opacity: 1;          
        }      
      `}</style>
    </>
  )
}

export default Compass