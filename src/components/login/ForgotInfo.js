import {useState} from 'react'
import Link from 'next/link'

const ForgotInfo = () => {
  const [login, setLogin] = useState("")

  const handleChange = (e) => {
    const {id, value} = e.target

    switch(id) {
      case "login":
        return setLogin(value)
      default:
        return null
    }
  }  

  return (
    <>
      <div id="forgot-container">
        <img src="/img/forgot.png" alt="Quest Logo" className="forgot-pic" />        
        <h3>Recover your Account</h3>
        <p>We'll send an email to the following account to reset your password</p>
        <input id="login" className="form" type="text" name="login"
          placeholder="Username or Email address" value={login} onChange={handleChange} />
        <ForgotButtons />
      </div>

      <style jsx>{`
        #forgot-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          height: 100vh;
        } 
        .form {
          padding: 6px;
          width: 250px;
          border: solid 1px DarkGray;
          border-radius: 3px;
        } 
        .pic {
          height: 200px;
        }
        @media only screen and (max-width: 600px) {
          p {
            margin: 0 20px 20px 20px;
          }
        }
      `}</style>
    </>
  )
}


const ForgotButtons = () => {

  return (
    <div id="button-container">
      <Link href="/">
        <button id="back-button" className="button">Back</button>
      </Link>
      <Link href="/">      
        <button id="submit-button" className="button">Submit</button>
      </Link>

      <style jsx>{`
        #button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }
        .button {
          margin: 5px;
          padding: 4px 10px;
          width: 100px;
          border: solid 1px DarkGray;
          border-radius: 10px;
        }      
        #back-button {
          background-color: white;
          color: Gray;
        }
        #submit-button {
          background-color: var(--orange1-color); 
          color: white;         
        }        
      `}</style>
    </div>
  )
}


export default ForgotInfo