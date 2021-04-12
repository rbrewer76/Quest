import {useRouter} from 'next/router'
import Navbar from './Navbar'

const Layout = ({children}) => {
  const router = useRouter()    

  return (
    <div className="layout">
      {router.pathname === "/" && <Navbar />}
      {children}
      <style jsx>{`
        .layout {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media only screen and (max-width: 1000px) {
          .layout {
            flex-direction: column;
          }
        }        
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          --orange0-color: #fba950;       // 251,169,80
          --orange1-color: #f07e05;       // 240,126,5
          --orange2-color: #c86904;
          --purple1-color: #990099;       // 153,0,153     
          --green1-color:  #00ff00;          
          --normal-color: gray;
          --uncommon-color: #00e600;
          --rare-color: #005ce6;
          --epic-color: #9900cc;
          --unique-color: #ff8000;        
        }
      `}</style>      

    </div>
  )
}

export default Layout