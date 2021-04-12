import {RecoilRoot} from 'recoil'
import {AuthProvider} from '../src/hooks/useAuth'

// Provide auth to all components
const App = ({Component, pageProps}) => {
  return (
    <AuthProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>  
    </AuthProvider>
  )
}

export default App