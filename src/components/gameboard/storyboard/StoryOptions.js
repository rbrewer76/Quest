const StoryOptions = () => {

  return (
    <>
      <div id="options-wrap">
        <div className="option">
          Option 1
        </div>
        <div className="option">
          Option 2
        </div>
        <div className="option">
          Option 3
        </div>
        <div className="option">
          Option 4
        </div>  
        <div className="option">
          Option 5
        </div>                               
      </div>
      <style jsx>{`
        #options-wrap {
          display: flex;
          justify-content: space-around;
          margin: 5px 0;          
        }
        .option {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 20px;
          width: 110px;
          font-size: 16px;
          background-color: #1a1a1a;
          border: solid 1px var(--orange1-color);
        }
      `}</style>
    </>
  )
}

export default StoryOptions