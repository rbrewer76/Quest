const StatusBar = (props) => {
  const {total, current} = props
  const percent = 100 - ((current/total)*100)
  const calcStyle = {"--p": percent + "%"}

  return (
    <>
      <div className="status-wrap">
        <div className="background">
          <div className="cover" style={calcStyle}></div>
        </div>
        <div className="totals">{current} / {total}</div>                        
      </div>
      <style jsx>{`
        .status-wrap {
          display: flex;
          align-items: center;
          height: 25px;
          width: 270px;
          white-space: nowrap;
        }
        .background {
          height: 11px;
          width: 270px;
          border: solid 1px black;
          background-image: linear-gradient(to right, red, var(--green1-color) 90%);
        }
        .cover {
          height: 11px;
          width: 270px;
          background-image: linear-gradient(to right, black, black);
          background-size: var(--p) 100%;
          background-position:right,left;          
          background-repeat: no-repeat;          
        }
        .totals {
          position: relative;
          right: 56%;
          font-size: 10px;
        }      
      `}</style>
    </>
  )
}

export default StatusBar