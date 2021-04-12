import {useContext, useState} from 'react'
import {DashStateContext} from '../Dashboard'
import {CharCreateContext} from './CharCreateMain'
import {useAuth} from '../../../hooks/useAuth'
import PortraitList from './PortraitList'
import {createCharacter} from '../../../fetch/character'
const classes = require('../../../../data/class.json')

const CreatePanel = () => {
  const {classId, setShowCreatePanel} = useContext(CharCreateContext)    
  const {dispatch} = useContext(DashStateContext)  
  const [name, setName] = useState("")
  const [portraitId, setPortraitId] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isCreating, setIsCreating] = useState()

  const auth = useAuth()

  const createChar = async () => {
    if (name < 2 || name > 25)
      setErrorMsg("Your character must have a name. It should be between 2 and 25 characters")
    else if (!portraitId)
      setErrorMsg("Select a character portrait")
    else {
      setErrorMsg("")
      setIsCreating(true)
      const currentClass = classes.find(x => x.id === classId)
      await createCharacter(auth.user.uid, name, currentClass.name, classId, portraitId)
        .then(() => dispatch({type: "close-create"}))
    }
  }

  return (
    <>
      <div className="create-wrap">
        Character Name
        <input id="name" type="text" minLength={2} maxLength={25} value={name} onChange={e => setName(e.target.value)} />
        <p className="desc">2 - 25 characters</p>
        Select a character portrait
        <PortraitList classId={classId} portraitId={portraitId} setPortraitId={setPortraitId} />
        <div id="button-wrap">
          <div id="accept" className="create-btn" onClick={() => createChar()}>Accept</div>
          <div id="cancel" className="create-btn" onClick={() => setShowCreatePanel(false)}>Cancel</div>
        </div>
        <div id="error">{errorMsg}</div>
        {isCreating && <div>Creating your character ...</div>}
      </div>
      <style jsx>{`
        .create-wrap {
          align-self: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: auto;
          width: 575px;
          min-width: 575px;
         }
        #name {
          margin-top: 10px;
          width: 250px;
          padding: 6px;
          border: solid 1px var(--orange1-color);
          border-radius: 3px;          
        }
        .desc {
          margin: 0 0 30px 0;
          margin-top: 1px;
          padding: 0px;
          max-width: 250px;    
          font-size: 12px;
          color: Gray;
        }
        #button-wrap {
          display: flex;
          margin-top: 60px;
        }
        .create-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          height: 30px;
          width: 75px;
          border: solid 2px var(--orange1-color);
        }
        #error {
          margin: 10px;
          width: 400px;
          text-align: center;
          color: red;
        }
      `}</style>
    </>
  )
}


export default CreatePanel