import {useEffect} from 'react'
import {useAuth} from '../src/hooks/useAuth'
import {useRouter} from 'next/router'
import Layout from '../src/components/Layout'
import Register from '../src/components/registration/Register'

const SignUp = () => {
  
  const router = useRouter()
  const auth = useAuth()
  
  // redirect to index if already authenticated
  useEffect(() => {
    if (auth.user)
      router.push('/')
  }, [auth.user])

  return (
    <Layout>
      {auth.user !== null && !auth.user && <Register />}
    </Layout>
  )
}

export default SignUp