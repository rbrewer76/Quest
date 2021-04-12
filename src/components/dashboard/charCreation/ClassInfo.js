import {useContext} from 'react'
import {CharCreateContext} from './CharCreateMain'
import ClassCreateBtn from './ClassCreateBtn'
const classes = require('../../../../data/class.json')

const ClassInfo = () => {
  const {classId} = useContext(CharCreateContext)
  const currentClass = classes.find(x => x.id === classId)

  return (
    <>
      <div className="class-info-panel">
        <div className="class-desc">{currentClass.desc}</div>
        <div className="class-wrap-pic-att">
          <img src={currentClass.img} alt="class pic" className="class-pic" /> 
          <ClassAttributes att={currentClass.att} />
        </div>
        <span className="class-prof">A {currentClass.name} begins proficient in the following abilites:</span>
        <div className="class-wrap-exp-skill">         
          <ClassAbilityBox type="expertise" abil={currentClass.expertise} />
          <ClassAbilityBox type="skills" abil={currentClass.skills} />      
        </div>
        {currentClass.arcanespec.length > 0 && <ClassArcaneSpecBox arcanespec={currentClass.arcanespec} />}        
        <ClassCreateBtn />          
      </div>
      <style jsx>{`
        .class-info-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: calc(100vh - 44px);
          width: 575px;
          min-width: 575px;
          overflow: auto;
          scrollbar-width: thin;    
        }
        .class-desc {
          margin: 10px 15px 10px 10px;
          text-align: justify;
          text-justify: inter-word;          
        }
        .class-wrap-pic-att {
          display: flex;
        }
        .class-pic {
          padding: 25px 0;
          height: 100%;
          width: auto;
        }
        .class-prof {
          margin-top: 40px;
          margin-bottom: 5px;
        }
        .class-wrap-exp-skill {
          display: flex;
          justify-content: space-around;
          width: 500px;
        }
      `}</style>
    </>
  )
}


const ClassAttributes = (props) => {
  const {att} = props
  const attNames = ["Might","Agility", "Resilience", "Discipline", "Aptitude", "Arcane"]

  return (
    <>
      <div className="class-wrap-att">
        {att.map((x, index) => <span key={attNames[index]} className="class-att">{attNames[index]}: <span className="class-att-val">{x}</span></span>)}
      </div>
      <style jsx>{`
        .class-wrap-att {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 213px;
        }
        .class-att {
          margin: 8px 0;
        }
        .class-att-val {
          color: #00ff00
        }      
      `}</style>
    </>
  )
}


const ClassAbilityBox = (props) => {
  const {type, abil} = props

  return (
    <>
      <div className="class-wrap-abil">
        {type === "expertise" ? <u>Expertise</u> : <u>Skills</u>}
        {abil.map(x => <span key={x} className="class-abil">{x}</span>)}
      </div>
      <style jsx>{`
        .class-wrap-abil {
          display: flex;
          flex-direction: column;
          align-items: center;      
          margin-top: 10px;    
        }
        .class-abil {
          margin: 5px 0;
          color: #00ff00               
        }
      `}</style>
    </>
  )
}


const ClassArcaneSpecBox = (props) => {
  const {arcanespec} = props
  
  return (
    <>
      <div className="class-wrap-arcanespec">
        <u>Arcane Specialization</u>
        <span className="arcanespec">{arcanespec}</span>
      </div>
      <style jsx>{`
        .class-wrap-arcanespec {
          display: flex;
          flex-direction: column;
          align-items: center;      
          margin-top: 20px;    
        }
        .arcanespec {
          margin: 5px 0;
          color: #00ff00               
        }
      `}</style>
    </>
  )
}


export default ClassInfo