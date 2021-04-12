import Compass from './Compass'
import MiniMap from './MiniMap'

const MapMain = () => {

  return (
    <>
      <div id="map-wrap">
        <Compass />
        <MiniMap />
      </div>
      <style jsx>{`
      #map-wrap {
        display: flex;
        justify-content: space-between;
        margin: 5px;
        max-width: 340px;        
        border: solid 1px #303030;
      }
      `}</style>
    </>
  )
}

export default MapMain