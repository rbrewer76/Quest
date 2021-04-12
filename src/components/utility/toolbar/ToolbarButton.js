import ToolbarIcon from './ToolbarIcon'

// Used to wrap ToolbarIcon in a div for onClick() use. 
// Should receive function in prop propFunction
const ToolbarButton = (props) => {

  return(
    <>
      <div id="btn-wrap" onClick={props.propFunction} >
        <ToolbarIcon img={props.img} />
      </div>
      <style jsx>{`
        #btn-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}


export default ToolbarButton