import {useRecoilValue} from 'recoil'
import {roomState} from '../../../store/store-room'

const StoryDescMain = () => {
  const {name, desc, region} = useRecoilValue(roomState)

  return (
    <>
      <div id="desc-wrap">
        <div id="desc-title">
          <span>- {name} -</span><span id="region">{region && region.name}</span>
        </div>
        <div id="desc">
          {desc && desc.map((x, index) => <span key={index}>{x}<br /><br /></span>)}
        </div>
      </div>
      <style jsx>{`
        #desc-wrap
        {
          margin: 5px;
          height: 100%;
          width: auto;
          background-color: #1a1a1a;
          border: solid 1px #303030;
        }
        #desc-title {
          display: flex;
          justify-content: space-between;
          padding: 20px 20px 10px  20px;
          font-size: 20px;
        }
        #desc {
          padding: 10px 20px 20px 20px;          
          font-size: 16px;
        }
      `}</style>
    </>
  )
}

export default StoryDescMain

