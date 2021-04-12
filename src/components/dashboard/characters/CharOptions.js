import {useContext, useState} from 'react'
import {useRecoilState} from 'recoil'
import {pcState} from '../../../store/store-pc'
import {CharListContext} from './CharListMain'
import {useRouter} from 'next/router'
import {useAuth} from '../../../hooks/useAuth'
import {deleteCharacter, getCharacter, setCharacter} from '../../../fetch/character'
import {getCharacters} from '../../../fetch/characters'

const CharOptions = (props) => {
  const {charId, setCharacters} = useContext(CharListContext)
  const {uid} = props
  const [pc, setPc] = useRecoilState(pcState)  
  const [isDeleting, setIsDeleting] = useState(false)

  const auth = useAuth()
  const router = useRouter()

  const play = async () => {
    // save charId to sessionStorage for retreaval on reload
    setPc(await getCharacter(charId))
    sessionStorage.setItem("cid", charId)
    setCharacter(charId, {online: true})
    router.push('/play')
  }

  const deleteChar = async () => {
    if (auth.user.uid === uid) {
      await deleteCharacter(charId)
      // get a refreshed character list
      // even though the delete returns a resolved promise from firebase, sometimes,
      // firebase has not finished deleting before getCharacters is called, and so 
      // the list is not updated. maybe change to update via stream ?
      setTimeout(async () => setCharacters(await getCharacters(auth.user.uid)), 1000)
    }
  }

  return (
    <>
      <div id="char-options">
        <div id="delete-wrapper">
          <img className="skull" src="/icons/skull.svg" alt="delete char" onClick={() => setIsDeleting(true)} />
          <div>
            {isDeleting &&
              <div id="delete-prompt-wrapper">
                <span id="delete-prompt">Permanently kill this character?</span>
                <img id="del-yes" src="/icons/check.svg" alt="yes" onClick={() => deleteChar()} />
                <img id="del-no" src="/icons/x.svg" alt="no" onClick={() => setIsDeleting(false)} />
              </div>}
          </div>
        </div>
        {!isDeleting && 
        <div id="play-button" onClick={() => play()}>
          <span id="play" className="option">Play</span>
          <img className="arrow" src="/icons/right-arrows.svg" alt="play arrow" />
        </div>}
      </div>
      <style jsx>{`
        #char-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
          height: 35px;
          width: 446px;
          background-image: linear-gradient(to right, black, #303030 70%);
        }
        .option {
          margin: 0 20px;
        }
        #play-button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          width: 80px;      
        }
        #play {
          margin-right: 5px;
          color: var(--orange1-color);
        }
        #delete-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #delete-prompt-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }        
        .skull {
          margin-left: 5px;
          padding: 2px;
          height: 15px;
          width: 15px;
        }
        #delete-prompt {
          margin-left: 8px;
          font-size: 16px;
        }
        #del-yes {
          margin-left: 25px;
          padding: 2px;          
        }
        #del-no {
          margin-left: 15px;
          padding: 2px;          
        }
        .arrow {
          height: 20px;
          width: 20px;
        }
      `}</style>
    </>
  )
}


export default CharOptions