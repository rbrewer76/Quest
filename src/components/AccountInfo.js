import {useEffect, useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import {db} from '../../config/firebase'

const AccountInfo = () => {
  const [userDetails, setUserDetails] = useState("")
  const auth = useAuth()

  return (
    <>
      <div id="welcome"> 

      </div>
      <style jsx> {`
        #welcome {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  )
}


export default AccountInfo