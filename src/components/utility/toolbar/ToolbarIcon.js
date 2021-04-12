import IconFrame from '../IconFrame'

const ToolbarIcon = ({img}) => {

  return (
    <>
      <IconFrame>
        <div className="icon-wrap">
          <img className="img" src={img} alt={""} />
        </div>
      </IconFrame>
      <style jsx>{`
        .icon-wrap {
          height: 40px;
          width: 40px;
          background-color: black;
        }
        .img {
          height: 40px;
          width: 40px;
        }
      `}</style>
    </>
  )
}


export default ToolbarIcon