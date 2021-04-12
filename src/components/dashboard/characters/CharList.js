import {useContext} from 'react'
import {CharListContext} from './CharListMain'
import PicFrame from '../../utility/PicFrame'
import TileFrame from '../../utility/TileFrame'
import CharOptions from './CharOptions'

const CharList = () => {
  const {characters} = useContext(CharListContext)

  return (
    <>
      {characters.length > 0 && characters.map(x => <Character key={x.cid} char={x} />)}
    </>
  )
}

const Character = (props) => {
  const {charId, setCharId} = useContext(CharListContext)  
  const {uid, cid, name, cname, lvl, pic} = props.char
  const active = (cid === charId) ? "active" : null

  return (
    <>
      <TileFrame>
        <div className={"char-wrap " + active} onClick={() => setCharId(cid)}>
          <PicFrame pic={pic} />
          <div className="char-info-wrapper">
            <div className="name">{name}</div>
            <div className="char-info">
              <div className="lvl">{lvl}</div>
              <div className="class">{cname}</div>
            </div>
          </div>
        </div>
      </TileFrame>

      {active && <CharOptions uid={uid} />}
      <style jsx>{`
        .char-wrap {
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
      `}</style>
    </>
  )
}


export default CharList