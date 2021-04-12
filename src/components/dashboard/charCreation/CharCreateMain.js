import {createContext, useEffect, useMemo, useState} from 'react'
import ClassInfo from './ClassInfo'
import ClassList from './ClassList'
import CreatePanel from './CreatePanel'
export const CharCreateContext = createContext()

const CharCreateMain = () => {
  const [classId, setClassId] = useState("")
  const [showCreatePanel, setShowCreatePanel] = useState(false)

  useEffect(() => {
    setShowCreatePanel(false)
  }, [classId])

  const contextValue = useMemo(() =>{
    return {classId, setClassId, showCreatePanel, setShowCreatePanel}
  }, [classId, setClassId, showCreatePanel, setShowCreatePanel])

  return (
    <>
      <div id="char-create-main">
        <CharCreateContext.Provider value={contextValue}>
        <ClassList />
        {classId && 
          <div id="create-panel-wrap">
          <ClassInfo classId={classId} />
          {showCreatePanel && 
            <>
              <img src="/img/creation/classpic/createDivider.png" alt="divider" className="divider" />
              <CreatePanel />
            </>}        
        </div>}
        </CharCreateContext.Provider>
      </div>
      <style jsx>{`
        #char-create-main {
          display: flex;
          align-items: flex-start;
          height: 100vh;
          width: 100%;
          color: white;
          font-size: 20px;                     
          background-color: black;
          overflow: auto;          
        }
        #create-panel-wrap {
          display: flex;
          margin: 10px 10px 10px 0;
          padding: 10px;        
          background-color: #303030;          
          border: 2px solid var(--orange1-color);                            
        }
        .divider {
          align-self: center;
          height: 80vh;
          width: auto;
        }
      `}</style>
    </>
  )
}


export default CharCreateMain