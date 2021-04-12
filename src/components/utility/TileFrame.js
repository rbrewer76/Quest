const TileFrame = ({ children }) => {

  return (
    <>
      <div className="tile-frame" >
        {children}
      </div>
      <style jsx>{`
        .tile-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px;
          height: 100px;
          min-height: 100px;
          width: 450px;
          background-image: linear-gradient(to top right, var(--orange1-color), black 20%, var(--purple1-color) 90%);
        }
      `}</style>
    </>
  )
}

export default TileFrame