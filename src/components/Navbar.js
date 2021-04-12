import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '../hooks/useAuth'
import firebase from 'firebase'
import AccountInfo from './AccountInfo'
import Login from './login/Login'
import LogoutButton from '../components/LogoutButton'

const Navbar = () => {
  const [validated, setValidated] = useState(false)

  const auth = useAuth()
  const router = useRouter()    

  // Check Firebase for email verification every 5 seconds
  useEffect(() => {
    if (auth.user && !auth.user.emailVerified) {
      let checkForVerifiedInterval =
      setInterval(() => {
        console.log("checking Firebase for email verification")
        firebase.auth().currentUser.reload()
          .then(() => {
            if (firebase.auth().currentUser.emailVerified) {
              clearInterval(checkForVerifiedInterval)
              setValidated(true)
            }
          })
      }, 5000)
    }
  }, [auth])
//               <img src="/img/QuestLogo2.png" alt="Quest Logo" className="logo" />                  
  return (
    <>
      {
        auth.user ?
          <div id="navbar">
            <div id="welcome-wrapper">
              <div id="welcome"> 
                Welcome {auth.user.displayName} !
                <LogoutButton />              
              </div>            

              {auth.user.emailVerified ? 
                <div id="play-btn-wrapper" onClick={() => router.push('/dash')}>
                  <div id="play-btn">PLAY</div>
                </div>
                :
                (
                  <>
                    <div>Your journey awaits.</div>
                    <div id="ev1">Check your email and verify your email address to start your adventure!</div>
                  </>
                )}
              </div>
            <AccountInfo />                                         
          </div>
        :
          <div id="navbar2">
            {auth.user !== null && router.pathname === "/" && <Login />}
          </div>
        }
      <style jsx>
        {`
          #navbar, #navbar2 {
            display: flex;
            flex-direction: column;
            width: 500px;
            max-width: 500px;
            height: 100vh;
            background-color: #303030;
            color: lightgray;
            border-right: solid 5px var(--orange1-color);
          }
          #navbar {
            justify-content: flex-start; 
            align-items: center;            
          }
          #navbar2 {
            justify-content: center; 
            align-items: center;
          }
          #welcome-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc(100% - 40px);
            margin: 0 20px;
          }
          #welcome {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }          
          #play-btn-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;            
            height: 34px;
            width: 84px;
            background-image: linear-gradient(to top right, var(--orange1-color), black 20%, var(--purple1-color) 90%);
          }
          #play-btn {
            display: flex;
            align-items: center;
            justify-content: center;  
            height: 30px;
            width: 80px;
            font-size: 24px;
            background-color: #303030;
          }
          #ev1 {
            margin-top: 20px;
            width: 250px;
            text-align: center;
          }

          @media only screen and (max-width: 1000px) {
            #navbar, #navbar2 {
              width: 100%;
              max-width: 1000px;
              border: none;
            }
            #navbar {
              padding: 0 0 40px 0;              
              height: 220px;
            }
            #navbar2 {
              padding: 40px 0;
              height: 180px;              
            }                        
          }
        `}</style>
    </>
  )
}


export default Navbar