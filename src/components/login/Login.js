import {useEffect, useState, useRef} from 'react'
import {useAuth} from '../../hooks/useAuth'
import Link from 'next/link'

const Login = () => {
  const [display, setDisplay] = useState(1)   // 1 = don't show password field, 2 = show password field
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  
  // focus the login field, on display change focus the password
  const focusElement1 = useRef(null)
  const focusElement2 = useRef(null)
  useEffect(() => {
    if (display === 1) {
      if (focusElement1.current)
        focusElement1.current.focus()
    }
    else {
      if (focusElement2.current)
        focusElement2.current.focus()    
    }
  }, [display])

  const handleChange = (e) => {
    const {id, value} = e.target

    switch(id) {
      case "login":
        return setLogin(value)
      case "password":
        return setPassword(value)
      default:
        return null
    }
  }

  const handleEnterKey = (e) => {
    if(e.keyCode === 13) {
      if (e.currentTarget.id === "login") {
        if (display === 1)
          document.getElementById("next-button").click()
      }
      if (e.currentTarget.id === "password") 
        document.getElementById("login-button").click()           
    }
  }

  return (
    <div id="login-container">
      <p>Login to your Quest Account</p>    
      <input ref={focusElement1} id="login" className="form" type="email" name="email"
        placeholder="Username or Email address" value={login} onChange={handleChange} onKeyUp={handleEnterKey} />
      {display === 2 && <input ref={focusElement2} id="password" className="form" type="password" name="password"
        placeholder="Password" value={password} minLength={8} maxLength={25} onChange={handleChange} onKeyUp={handleEnterKey} />}
      <LoginButtons display={display} setDisplay={setDisplay} login={login} password={password} setErrorMsg={setErrorMsg} />
      <div id="error">{errorMsg}</div>
      <div id="forgot">
        <Link href="/forgot">
          <a>Forgot your login?</a>
        </Link>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
      <style jsx>{`
        #login-container {
          align-self: center;
          display: flex;
          flex-direction: column;
        }
        p {
          margin-top: 0;
        }
        .form {
          margin-top: 10px;
          padding: 6px;
          width: 250px;
          background-color: #404040;
          color: lightgray;          
          border: solid 1px var(--orange1-color);
          border-radius: 3px;          
        }
        #error {
          margin: 10px 0;
          width: 264px;
          color: red;
        }
        #forgot {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 10px;
          width: 264px;
          border-top: solid 1px darkgray;
        }
        #forgot a {
          margin-left: 0;
          color: var(--orange1-color);
          text-decoration: none;
        }        
      `}</style>    
    </div>    
  )
}


const LoginButtons = (props) => {
  const {display, setDisplay, login, password, setErrorMsg} = props

  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const auth = useAuth()
  
  const handleClick = (e) => {
    const {id} = e.target


    switch (id) {
      case "next-button":
        if (!regex.test(login)) {
          setErrorMsg("Enter a valid email address")
          break
        }
        setErrorMsg("")        
        return setDisplay(2)
      case "login-button":
        if (!login || !password || password < 8 )
          break
        return auth.signIn(login, password, setErrorMsg)
      default:
        return null
    }
  }

  return (
    <>
      {display === 1 && <button id="next-button" className="button" onClick={handleClick}>Next</button>}
      {display === 2 && <button id="login-button" className="button" onClick={handleClick}>Login</button>}

      <style jsx>{`
        .button {
          margin-top: 20px;
          padding: 4px 10px;
          width: 264px;
          background-color: var(--orange1-color);
          border: solid 1px var(--orange1-color);
          border-radius: 4px;          
        }
      `}</style>
    </>
  )
}


export default Login