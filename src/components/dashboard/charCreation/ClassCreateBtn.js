import {useContext} from 'react'
import {CharCreateContext} from './CharCreateMain'

const ClassCreateBtn = () => {
  const {showCreatePanel, setShowCreatePanel} = useContext(CharCreateContext)  

  return (
    <>
      {!showCreatePanel && <div id="create-btn" onClick={() => setShowCreatePanel(true)}>
        Create
      </div>}
      <style jsx>{`
        #create-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30px 0 10px 0;
          height:40px;
          min-height: 40px;
          width: 110px;
          border: solid 2px var(--orange1-color);
        }
      `}</style>
    </>
  )
}


export default ClassCreateBtn