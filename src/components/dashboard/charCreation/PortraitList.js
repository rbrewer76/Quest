import {useContext} from 'react'
import {CharCreateContext} from './CharCreateMain'

const PortraitList = (props) => {
  const {classId} = useContext(CharCreateContext)
  const {portraitId, setPortraitId} = props
  const portraits = require(`../../../../data/portrait/${classId}.json`)  

  return (
    <>
      <div id="pic-wrap">
        {portraits.map(x => <Portrait key={x.id} portrait={x} portraitId={portraitId} setPortraitId={setPortraitId} />)}
      </div>
      <style jsx>{`    
        #pic-wrap {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          height: 160px;
          width: 400px;
          overflow: auto;
          scrollbar-width: thin;    
        }   
      `}</style>
    </>
  )
}


const Portrait = (props) => {
  const {portraitId, setPortraitId} = props
  const {id, img} = props.portrait

  return (
    <>
      <img className={`pic ${id === portraitId ? "active" : null}`} src={img} alt="portrait" onClick={() => setPortraitId(id)} /> 
      <style jsx>{`    
        .pic {
          height: auto;
        }
        .active {
          width: 78px;
          border: solid 1px var(--orange1-color);
        }
      `}</style>
    </>
  )
}


export default PortraitList