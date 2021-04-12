import {useState, useContext, useEffect, createContext} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import {auth, db} from '../../config/firebase'

const authContext = createContext()

// Provider to wrap app and make auth object available to any child component that calls useAuth()
export function AuthProvider({children}) {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}


// Hook for child components to get auth object
export const useAuth = () => useContext(authContext)


// Provider hook that creates auth object and handles state
function useAuthProvider() {
  const [user, setUser] = useState(null)
  const LOCAL = firebase.auth.Auth.Persistence.LOCAL      // requires explicit sign out
  const SESSION = firebase.auth.Auth.Persistence.SESSION  // current session or tab
  const NONE = firebase.auth.Auth.Persistence.NONE        // no persistance

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any 
  // component that utilizes this hook to re-render with the 
  // latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) 
        setUser(user)
      else 
        setUser(false)
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])  


  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signUp = (email, password, username, displayName, country, state, city) => {
    firebase.auth().setPersistence(SESSION)
      .then(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(response => {
            response.user.sendEmailVerification()
            setUser(response.user)
            response.user.updateProfile({displayName: displayName})
            // add extra user data
            db.collection('users').doc(response.user.uid)
              .set({uid: response.user.uid, username, country, state, city, displayName, friends:""})
              .catch((error) => console.log(error))
            return response.user                
          })
          .catch(error => console.log(error.message))
      })
  }


  const signIn = (email, password, setErrorMsg) => {
    firebase.auth().setPersistence(SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
          .then(response => {
            setUser(response.user)
            return response.user
        })
      })      
      .catch(error => setErrorMsg(error.message))      
  }


  const signOut = () => {
    return firebase.auth().signOut()
      .then(() => setUser(false))
  }


  const sendPasswordResetEmail = email => {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => true)
  }


  const confirmPasswordReset = (code, password) => {
    return firebase.auth().confirmPasswordReset(code, password)
      .then(() => true)
  }

  // Return the user object and auth methods
  return {
    user, signUp, signIn, signOut, sendPasswordResetEmail, confirmPasswordReset
  }
}