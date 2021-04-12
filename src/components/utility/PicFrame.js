const PicFrame = ({pic}) => {

  return (
    <>
      <img className="pic-frame" src={pic} alt=""></img>

      <style jsx>{`
        .pic-frame {
          margin: 5px;
          height: 80px;
          width: 80px;
          background-color: gray;
          border: solid 2px black;
        }      
      `}</style>
    </>

  )
}


export default PicFrame