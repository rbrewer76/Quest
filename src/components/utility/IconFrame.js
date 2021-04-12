const IconFrame = ({children}) => {

  return (
    <>
      <div className="icon-frame">
        {children}
      </div>
      <style jsx>{`
        .icon-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px; 
          height: 44px;
          width: 44px;
          background-image: linear-gradient(to top right, var(--orange1-color), black 20%, var(--purple1-color) 90%);
        }
      `}</style>
    </>
  )
}


export default IconFrame