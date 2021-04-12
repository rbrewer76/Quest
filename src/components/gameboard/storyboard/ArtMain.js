const ArtMain = (props) => {

  return (
    <>
      <div id="art-wrap">
        <img className="img" src={props.img} />
      </div>
      <style jsx>{`
        #art-wrap {
          margin: 5px;  
          background-color: #303030;
          border: solid 1px #303030;
        }
        .img {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default ArtMain