import {useEffect} from 'react'
import {useAuth} from './useAuth'
import {useRouter} from 'next/router'

export const useRequireAuth = () => {
  const auth = useAuth()
  const router = useRouter()

  // redirect to index if not authenticated  
  useEffect(() => {
    if (auth.user !== null && !auth.user)
      router.push('/')    
  }, [auth, router])

  return auth
}