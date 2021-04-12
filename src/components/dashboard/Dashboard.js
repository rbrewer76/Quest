import {createContext, useMemo, useReducer} from 'react'
import CharListMain from "./characters/CharListMain"
import CharCreateMain from "./charCreation/CharCreateMain"
import BackButton from './BackButton'

export const DashStateContext = createContext()

const DashBoard = () => {

  // control visibility of all dashboard modules
  const initialState = {
    showCharacters: true, 
    showCreation: false
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "create":
        return {...state, showCharacters: false, showCreation: true}
      case "close-create":
        return {...state, showCharacters: true, showCreation: false}        
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => {
    return {state, dispatch}
  }, [state, dispatch])

  return (
    <>
      <div id="dash-wrap">
        <DashStateContext.Provider value={contextValue}>
          {state.showCharacters && 
            <>
              <BackButton />
              <CharListMain />
            </>}
          {state.showCreation && <CharCreateMain />}
        </DashStateContext.Provider>      
      </div>
      <style jsx>{`
        #dash-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100vh;
          width: 100%;
          color: white;
          font-size: 20px;                     
          background-color: black;
          overflow: auto;              
        }
      `}</style>
    </>
  )
}


export default DashBoard