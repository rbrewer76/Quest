import {useContext} from 'react'
import {DashStateContext} from '../../dashboard/Dashboard'

const BackButton = () => {
  const {dispatch} = useContext(DashStateContext)  

  return (
    <>
      <div id="options">
        <div id="back-wrap" onClick={() => dispatch({type: "close-create"})} >
          <img className="arrow" src="/icons/left-arrows.svg" alt="back arrow" />
          <span id="back" className="option">Back</span>
        </div>  
      </div>
      <style jsx>{`
        #options {
          display: flex;
          justify-content: flex-start;
          margin-top: 5px;
          margin-bottom: 5px;
          margin-left: 7px;
          height: 35px;
          min-height: 35px;          
          width: 446px;
          background-image: linear-gradient(to right, black, #303030 70%);
        }
        #back-wrap {
          display: flex;
          align-items: center;
          margin-left: 10px;
        }
        .arrow {
          height: 20px;
          width: 20px;
        }
        #back {
          margin-left: 5px;
          color: var(--orange1-color);
        }
      `}</style>
    </>
  )
}


export default BackButton