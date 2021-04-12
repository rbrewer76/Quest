import {useRecoilValue} from 'recoil'
import {pcCurrentRoomState} from '../../../store/store-pc'
const region = require('../../../../data/regions/4.json')

const MiniMap = () => {
  const currentroom = useRecoilValue(pcCurrentRoomState)

  return (
    <>
      <div id="minimap-wrap" >
        MiniMap



      </div>
      <style jsx>{`
        #minimap-wrap {
          margin: 10px;
          height: 182px;
          width: 182px;
          background-color: gray;
        }
      `}</style>
    </>
  )
}

export default MiniMap