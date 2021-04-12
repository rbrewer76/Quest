import {useContext} from 'react'
import {DashStateContext} from '../Dashboard'
import TileFrame from '../../utility/TileFrame'

const CharNewBtn = () => {
  const {dispatch} = useContext(DashStateContext)

  return (
    <>
      <TileFrame>
        <div id="create-btn" onClick={() => dispatch({ type: "create" })}>Create New Character</div>
      </TileFrame>
      <style jsx>{`
        #create-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 96px;   
          width: 446px;
          font-size: 30px;          
          background-color: #303030;
          color: white;
        }             
      `}</style>
    </>
  )
}


export default CharNewBtn