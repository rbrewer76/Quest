import {useAuth} from '../hooks/useAuth'

const LogoutButton = () => {
  const auth = useAuth()

  return (
    <>
      <div id="logout-btn" onClick={() => auth.signOut()}>
        <img id="logout-icon" src="/icons/sign-out-alt-solid.svg" alt="logout" />
        Logout
      </div>
      <style jsx>{`
        #logout-btn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-left: 10px;
        }
        #logout-icon {
          margin: 5px;
          height: 25px;
          width: 25px;
        }
      `}</style>
    </>
  )
}


export default LogoutButton