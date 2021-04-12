import {useRouter} from "next/router"

const BackButton = () => {
  const router = useRouter()

  return (
    <>
      <div id="options">
        <div id="back-wrap" onClick={() => router.push("/")} >
          <img className="arrow" src="/icons/left-arrows.svg" alt="back arrow" />
          <span id="back" className="option">Back</span>
        </div>  
      </div>
      <style jsx>{`
        #options {
          display: flex;
          justify-content: flex-start;
          margin-top: 10px;
          margin-left: 12px;
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