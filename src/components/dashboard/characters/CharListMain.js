import {createContext, useEffect, useMemo, useState} from 'react'
import {useAuth} from '../../../hooks/useAuth'
import {getCharacters} from '../../../fetch/characters'
import CharList from './CharList'
import CharNewBtn from './CharNewBtn'
export const CharListContext = createContext()

const CharListMain = () => {
  const [characters, setCharacters] = useState([])
  const [charId, setCharId] = useState("")
  const auth = useAuth()

  useEffect(async () => {
    setCharacters(await getCharacters(auth.user.uid))
  }, [])
  
/*
  const contextValue = useMemo(() => {
    return {characters, setCharacters, charId, setCharId}
  }, [characters, setCharacters, charId, setCharId])
*/
  return (
    <>
      <div className="char-panel">
        <CharListContext.Provider value={{characters, setCharacters, charId, setCharId}}>
          <CharNewBtn />
          <CharList />
        </CharListContext.Provider>
      </div>
      <style jsx>{`
        .char-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 5px;
          width: 460px;
      }
      `}</style>
    </>
  )
}


export default CharListMain