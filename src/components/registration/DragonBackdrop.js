const DragonBackdrop = () => {

  return (
    <>
      <img id="dragon" src="/img/logoLarge.png" alt="dragon" />

      <style jsx>{`
        #dragon {
          position: absolute;
          opacity: .1;
          z-index: -1;
          height: 790px;
          width: 997px;
        }

        @media only screen and (max-width: 1000px) {
          #dragon {
            display: none;
          }  
        }        
      `}</style>
    </>
  )
}

export default DragonBackdrop