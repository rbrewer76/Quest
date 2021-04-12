import {useEffect, useRef, useState} from 'react'
import {useAuth} from '../../hooks/useAuth'
import Link from 'next/link'
import DragonBackdrop from './DragonBackdrop'
import PageTrack from './PageTrack'
import styles from './Register.module.css'

const Register = () => {
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")  
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const handleChange = (e) => {
    const {id, value} = e.target
    
    switch (id) {
      case "email-form":
        return setEmail(value)
      case "password-form":
        return setPassword(value)
      case "password2-form":
        return setPassword2(value)
      case "username-form":
        return setUsername(value)
      case "display-form":
        return setDisplayName(value)
      case "country-form":
        setState("")
        setCity("")        
        return setCountry(JSON.parse(value))
      case "state-form":
        setCity("")                
        return setState(JSON.parse(value))
      case "city-form":
        return setCity(JSON.parse(value))
      default:
        return null
    }
  }

  const handleEnterKey = (e) => {
    if(e.keyCode === 13) {
      if (e.currentTarget.id === "email-form" || e.currentTarget.id === "password-form" || e.currentTarget.id === "password2-form"
        || e.currentTarget.id === "username-form" || e.currentTarget.id === "display-form" || e.currentTarget.id === "country-form"
        || e.currentTarget.id === "state-form" || e.currentTarget.id === "city-form")
        document.getElementById("next-button").click()           
    }
  }  
  
  return (
    <div id="reg-container" className={styles.container}>
      <DragonBackdrop />
      <Welcome page={page} />
      <PageTrack page={page} />
      {page === 1 && <RegisterPage1 email={email} password={password} password2={password2} handleChange={handleChange} handleEnterKey={handleEnterKey} />}
      {page === 2 && <RegisterPage2 username={username} displayName={displayName} 
        country={country} state={state} city={city} handleChange={handleChange} handleEnterKey={handleEnterKey} />}
      {page === 3 && <RegisterPage3 email={email} username={username} displayName={displayName}
        country={country} state={state} city={city} />}  
      <RegisterButtons page={page} setPage={setPage} 
                       email={email} password={password} password2={password2} username={username} displayName={displayName} 
                       country={country} state={state} city={city} />    
    </div>    
  )
}


const Welcome = ({page}) => {

  return (
    <>
      <h1>Welcome to Quest!</h1>
      {page === 1 && <h3>Register an account with us and begin your journey!</h3>}
      {page === 2 && <h3>Soon you will meet new adventurers, slay monsters, earn experience and more!</h3>}
      {page === 3 && <h3>Almost there!</h3>}            

      <style jsx> {`
        #reg-container h1, h3 {
          margin: 10px;
          text-align: center;
        }
        h1 {
          border-bottom: solid 2px var(--orange1-color);
          margin-top: 0;
        }
      `}</style>      
    </>
  )
}


const RegisterButtons = (props) => {
  const {page, setPage, email, password, password2, username, displayName, country, state, city} = props
  const [errorMsg, setErrorMsg] = useState("")
  
  const auth = useAuth()

  // focus the submit button
  const focusElement = useRef(null)
  useEffect(() => {
    if (focusElement.current)
      focusElement.current.focus()
  }, [page])  

  const handleClick = (e) => {
    const {id} = e.target

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    // if on page 1 and back button go to index (main page)
    // if on page 3 and sumbit button go to User Logged In page
    switch(id) {
      case "back-button":
        return setPage(page - 1)            
      case "next-button":
        if (page === 1) {
          if (!regex.test(email)) {
            setErrorMsg("Enter a valid email address")
            break
          }
          if (password.length < 8 || password.length > 25 || password2.length < 8 || password2.length > 25) {
            setErrorMsg("Passwords must be between 8 and 25 characters")
            break            
          }
          if (password !== password2) {
            setErrorMsg("Passwords do not match")
            break
          }
        }
        if (page === 2) {        
          if (username.length < 8 || username.length > 25) {
            setErrorMsg("Your username must be between 8 and 25 characters and be unique")
            break
          }
          if (!displayName.length) {
            setErrorMsg("You must provide a display name that others will see")
            break
          }
          if (country === "" || state === "" || city === "") {
            setErrorMsg("Provide your location information")
            break
          }
        }
        setErrorMsg("")  
        return setPage(page + 1)            
      case "submit-button":
         return auth.signUp(email, password, username, displayName, country, state, city)
      default:
        return null
    }
  }

  return (
    <div id="button-container">
      <div>
        {page === 1 && <Link href="/"><button id="index-button" className="button">Back</button></Link>}
        {page !== 1 && <button id="back-button" className="button" onClick={handleClick}>Back</button>}
        {page !== 3 && <button id="next-button" className="button" onClick={handleClick}>Next</button>}
        {page === 3 && <button ref={focusElement} id="submit-button" className="button" onClick={handleClick}>Submit</button>}   
      </div>  
      <div id="error">{errorMsg}</div>

      <style jsx>{`
        .button {
          margin: 5px;
          padding: 4px 10px;
          width: 100px;
          border: solid 1px DarkGray;
          border-radius: 10px;
        }      
        #button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
        }
        #back-button, #index-button {
          background-color: white;
          color: Gray;
        }
        #submit-button {
          background-color: var(--orange1-color);
          color: white;         
        }
        #error {
          margin: 10px;
          color: red;
        }

        @media only screen and (max-width: 600px) {
          #button-container {
            margin-top: 20px;
          }
        }


      `}
      </style>
    </div>      
  )
}


const RegisterPage1 = (props) => {
  const {email, password, password2, handleChange, handleEnterKey} = props

  // focus the first field
  const focusElement = useRef(null)
  useEffect(() => {
    if (focusElement.current)
      focusElement.current.focus()
  }, [])

  return (
    <>
      <div className={styles.formWrapper}>
        <span className={styles.label}>Email</span>
        <input ref={focusElement} id="email-form" className={styles.form} type="email" name="email" 
          placeholder="Email" value={email} onChange={handleChange} onKeyUp={handleEnterKey} />
      </div>
      <div className={styles.formWrapper}>
        <span className={styles.label}>Password</span>
        <input id="password-form" className={styles.form} type="password" name="password" 
          placeholder="Password" value={password} minLength={8} maxLength={25} onChange={handleChange} onKeyUp={handleEnterKey} />
        <p className={styles.desc}>Atleast 8 characters, Max: 25</p>
      </div>
      <div className={styles.formWrapper}>
        <span className={styles.label}>Confirm Password</span>
        <input id="password2-form" className={styles.form} type="password" name="password2" 
          placeholder="Confirm Password" value={password2} minLength={8} maxLength={25} onChange={handleChange} onKeyUp={handleEnterKey} />
      </div>
    </>
  )
}


const RegisterPage2 = (props) => {
  const {username, displayName, country, state, city, handleChange, handleEnterKey} = props
  const [countries, setCountries] = useState(require("../../../data/country.json"))
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  // focus the first field
  const focusElement = useRef(null)
  useEffect(() => {
    if (focusElement.current)
      focusElement.current.focus()
  }, [])

  // Update the state list 
  useEffect(() => {
    const res = fetch("../api/signup/region/states/" + country.id).then(res => res.json()).then(res => setStates(res))
  }, [country])

  // Update the city list
  useEffect(() => {
    const res = fetch("../api/signup/region/cities/" + state.id).then(res => res.json()).then(res => setCities(res))    
  }, [state])

  return (
    <>
      <div className={styles.formWrapper}>
        <span className={styles.label}>Username</span>
        <input ref={focusElement} id="username-form" className={styles.form} type="text" name="username" 
          placeholder="Username" value={username} minLength={8} maxLength={25} onChange={handleChange} onKeyUp={handleEnterKey} />
        <p className={styles.desc}>Atleast 8 characters, Max: 25. Your Username must be unique!</p>          
      </div>
      <div className={styles.formWrapper}>
        <span className={styles.label}>Display Name</span>
        <input id="display-form" className={styles.form} type="text" name="displayName" 
          placeholder="Display Name" value={displayName} onChange={handleChange} onKeyUp={handleEnterKey} />
        <p className={styles.desc}>How you will appear to others within a game.</p>                    
      </div>
      <div id="loc-container" className={styles.formWrapper}>
        <span className={styles.label}>Location</span>
        <div id="loc-container2">
          <select id="country-form" className="loc-dropdown" name="country" value={JSON.stringify(country)} onChange={handleChange} onKeyUp={handleEnterKey}>
            {!country && <option value="">Select Country</option>}
            {countries.map(x => <option key={x.id} value={`{"id":"${x.id}","name":"${x.name}"}`}>{x.name}</option>)}
          </select>
          <select id="state-form" className="loc-dropdown" name="state" value={JSON.stringify(state)} onChange={handleChange} onKeyUp={handleEnterKey}>
            {!state && <option value="">Select State</option>}
            {states.length > 0 && states.map(x => <option key={x.id} value={`{"id":"${x.id}","name":"${x.name}","country_id":"${x.country_id}"}`}>{x.name}</option>)}            
          </select>
          <select id="city-form" className="loc-dropdown" name="city" value={JSON.stringify(city)} onChange={handleChange} onKeyUp={handleEnterKey}>
            {!city && <option value="">Select City</option>}
            {cities.length > 0 && cities.map(x => <option key={x.id} value={`{"id":"${x.id}","name":"${x.name}"}`}>{x.name}</option>)}
          </select>
        </div>
      </div>

      <style jsx>{`
        #loc-container {
          display: flex;
          align-items: center;
        }
        #loc-container2 {
          width: 262px;
        }
        .loc-dropdown {
          display: block;
          margin: 6px;
          padding: 6px;
          width: 175px;
          border: solid 1px DarkGray;
        }
      `}
      </style>
    </>
  )
}

      
const RegisterPage3 = (props) => {
  const {email, username, displayName, country, state, city} = props

  return (
    <>
      <div id="summary">
        <div id="desc">
          <p><strong>Email </strong></p>
          <p><strong>Username </strong></p>
          <p><strong>Display Name</strong></p>                    
        </div>
        <div id="divider">
        </div>
        <div id="info">
          <p>{email}</p>
          <p>{username}</p>
          <p>{displayName}</p>   
          <p>{country.name}</p>
          <p>{state.name}</p>
          <p>{city.name}</p>                    
        </div>
      </div>    

      <style jsx>{`
        #summary {
          display: flex;
          justify-content: center;
          padding: 20px;
          border: solid 1px DarkGray;
          border-radius: 4px;
        }
        #desc, #info {
          padding: 6px;
          width: 220px;
        }
        #divider {
          width: 2px;
          background-color: var(--orange1-color);
        }    
        #desc {
          text-align: end;            
        }

        @media only screen and (max-width: 550px) {
          #summary {
            border-left: none;
            border-right: none;
          }
          #desc, #info { 
            width: 130px;
          }          
        }
      `}
      </style>
    </>
  )
}


export default Register