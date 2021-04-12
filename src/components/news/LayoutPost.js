const LayoutPost = ({children}) => {

  return (
    <>
      <div id="post-wrap">
        <img id="quest" src="\img\news\quest.jpg" />
        {children}
      </div>
      <style jsx>{`
        #post-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #quest {
          margin-top: 20px;
          max-width: 153px;
        }
      `}</style>
    </>
  )
}

export default LayoutPost