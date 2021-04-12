const Toolbar = ({children}) => {

  return (
    <>
      <div className="button-wrap">
        {children}
      </div>
      <style jsx>{`
        .button-wrap {
          display: flex;
          flex-direction: column;
          padding: 5px 0;
          margin: 5px 0;
          border-top: solid 1px #303030;
          border-bottom: solid 1px #303030;
        }
      `}</style>
    </>
  )
}

export default Toolbar