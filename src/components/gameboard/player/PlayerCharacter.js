import {useContext} from 'react'
import {PlayerMobContext} from '../PlayMain'
import PicFrame from '../../utility/PicFrame'
import PlayerCharacterStatus from './PlayerCharacterStatus'
import TileFrame from '../../utility/TileFrame'

/*  Character details are passed as a prop because the same component is used
    for group characters as well
  */

const PlayerCharacter = (props) => {
  const {cid, name, lvl, cname, pic, exp, online} = props.char
  const {selectedPlayer, setSelectedPlayer} = useContext(PlayerMobContext)
  const active = (cid === selectedPlayer) ? "active" : null
  const offline = online ? null : "offline"

  return (
    <>
      <div id="pc-main-wrap" onClick={() => setSelectedPlayer(cid)} >
        <TileFrame>
          <div className={"pc-wrap " + active + " " + offline}>
            <PicFrame pic={pic} />
            <div className="char-info-wrapper">
              <div className="name">{name}</div>
              <div className="char-info">
                <div className={"lvl " + offline}>{lvl}</div>
                <div className="class">{cname}</div>
              </div>
            </div>
          </div>
        </TileFrame>
        {exp && <ExpBar exp={props.char.exp} />}                              
        <PlayerCharacterStatus char={props.char} />
      </div>
      <style jsx>{`
        #pc-main-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;   
          height: auto;
        }
        .pc-wrap {
          display: flex;
          align-items: center;
          height: 96px;   
          width: 436px;
          background-color: #303030;
          border-right: solid 10px #303030;                    
          color: white;
          font-size: 20px;                    
        }
        .char-info {
          display: flex;
        }
        .lvl {
          padding: 4px 10px;          
          color: lightgreen;
        }
        .class {
          padding-top: 4px;
        }
        .name {
          padding: 4px 10px;
          font-size: 30px;
        }
        .active {
          border-right: solid 10px var(--orange1-color);                    
        }      
        .offline {
          color: grey;
        }   
      `}</style>
    </>
  )
}


const ExpBar = (props) => {
  const {currentexp, neededexp} = props.exp
  const percent = 100 - ((currentexp/neededexp)*100)
  const calcStyle = {"--p": percent + "%"}

  return (
    <>
      <div id="exp-wrap">
        <div id="exp-background">
          <div id="exp-cover" style={calcStyle}></div>
        </div>
      </div>
      <style>{`
        #exp-wrap {
          position: relative;
          bottom: 17px;
          left: 44px;
          height: 2px;
          width: 320px;
        }
        #exp-background {
          height: 2px;
          width: 320px;
          background-image: linear-gradient(to right, lightgreen, lightgreen);          
        }
        #exp-cover {
          height: 2px;
          width: 320px;
          background-image: linear-gradient(to right, black, black);
          background-size: var(--p) 100%;
          background-position:right,left;          
          background-repeat: no-repeat;          
        }
      `}</style>
    </>
  )
}


export default PlayerCharacter