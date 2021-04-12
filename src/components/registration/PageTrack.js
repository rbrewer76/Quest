const PageTrack = ({page}) => {
    const pages = [
      {p: 1, text: "ACCOUNT"},
      {p: 2, text: "YOUR INFO"},
      {p: 3, text: "READY !"}
    ]
  
    return (
      <>
        <div id="page-container">
          {pages.map(p => <PageBlock key={p.p} page={page} p={p} />)}
        </div>
        <div className="page-line" />
  
        <style jsx>{`
          #page-container {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            width: 370px;
          }
          .page-line {
            position: relative;
            bottom: 87px;
            z-index: 1;
            width: 300px;
            height: 3px;
            background-image: linear-gradient(to right, var(--purple1-color), var(--orange1-color));
          }
          @media only screen and (max-width: 600px) {
            #page-container {
              width: 350px;
            }
            .page-line {
              width: 320px;
            }
          }
        `}
        </style>
      </>
    )
  }
  
  
  const PageBlock = (props) => {
    const {page} = props
    const {p, text} = props.p
  
    return (
      <>
        <div className="block-container">
          <div className={`reg-block ${p === page ? "active" : ""}`}>
            <span>{p}</span>
          </div>
          <p>{text}</p>
        </div>        
  
        <style jsx>{`
          .block-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 3px;
            font-size: 13px;
          }
          .reg-block {
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            width: 50px;
            font-size: 20px;
            background-color: whitesmoke;
            border-radius: 4px;
          }       
          .active { 
            background-color: var(--orange1-color); 
          }
        `}
        </style>
      </>  
    )
  }

  
  export default PageTrack