import {useContext} from 'react'
import {CharCreateContext} from './CharCreateMain'
import BackButton from './BackButton'
import PicFrame from '../../utility/PicFrame'
import TileFrame from '../../utility/TileFrame'
const classes = require('../../../../data/class.json')

const ClassList = () => {

  return (
    <>
      <div className="class-select-panel">
        <BackButton />        
        {classes.map(x => <Class key={x.id} id={x.id} name={x.name} icon={x.icon} />)}    
      </div>
      <style jsx>{`
        .class-select-panel {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 5px;
          height: calc(100% - 10px);
          min-width: 460px;
          overflow: auto; 
          scrollbar-width: thin;        
        }
      `}</style>
    </>
  )
}


const Class = (props) => {
  const {classId, setClassId} = useContext(CharCreateContext)  
  const {id, name, icon} = props  
  let active = (id === classId) ? active="active" : null

  return (
    <>
      <TileFrame>
        <div className={"char-class " + active} onClick={() => setClassId(id)}>
          <PicFrame pic={icon} />
          <div className="name">
            {name}
          </div>
        </div>
      </TileFrame>
      <style jsx>{`
        .char-class {
          display: flex;
          align-items: center;
          height: 96px;   
          width: 436px;
          background-color: #303030;
          border-right: solid 10px #303030;          
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


export default ClassList