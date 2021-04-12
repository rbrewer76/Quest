import {useRecoilValue, useRecoilState} from 'recoil'
import {pcCurrentRoomState} from '../../../store/store-pc'
import {roomState, roomPersistantState} from '../../../store/store-room'
import {useEffect} from 'react'
import ArtMain from './ArtMain'
import LocationMain from './LocationMain'
import MapMain from './MapMain'
import StoryDescMain from './StoryDescMain'
import StoryOptions from './StoryOptions'
import {getRoom} from '../../../fetch/rooms'
import {streamRoom} from '../../../functions/streams'

const StoryboardMain = () => {
  const currentRoom = useRecoilValue(pcCurrentRoomState)
  const [room, setRoom] = useRecoilState(roomState)
  const [roomPersistant, setRoomPersistant] = useRecoilState(roomPersistantState)

  useEffect(async () => {
    setRoom(await getRoom(currentRoom))
  }, [currentRoom])


  // Setup a real-time db stream of the room's persistant data
  useEffect(() => {
    if (currentRoom) {
      const unsubscribe = streamRoom(currentRoom, {
        next: querySnapshot => {
          const updatedRoom = querySnapshot.data()
          if (updatedRoom)
            setRoomPersistant(updatedRoom)
        }
      })
      return () => unsubscribe()
    }
    // allows update when room changes to new stream
    // setRoomPersistant allows update when persistant data changes
  }, [currentRoom, setRoomPersistant])

  return (
    <>
      <div id="story-wrap">
        <div id="left-pane" className="story-pane">
          <ArtMain img={room.img} />
          <StoryDescMain />
          <StoryOptions />    
        </div>
        <div id="right-pane" className="story-pane">
          <MapMain />
          <LocationMain />   
        </div>
      </div>
      <style jsx>{`
        #story-wrap {
          display: flex;
          height: 100%;
          width: 100%;
        }
        .story-pane {
          display: flex;
          flex-direction: column;
        }
        #left-pane {
          margin: 5px;
          margin-right: 0;            
          width: 60%;  
        }
        #right-pane {
          margin: 5px;        
          margin-left: 0;                      
          width: 40%;  
        }
        #region {
          margin: 2px 5px 0 5px;
          height: 25px;
          font-size: 20px;
        }        
      `}</style>
    </>
  )
}

export default StoryboardMain