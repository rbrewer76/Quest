import {useRecoilValue} from 'recoil'
import {pcCidState} from '../../../store/store-pc'
import {useEffect, useState} from 'react'
import {streamNotifications} from '../../../functions/streams'
import {declineNotification} from '../../../fetch/notifications'
import {addGroupCharacter} from '../../../fetch/group'

const Notifications = () => {
  const cid = useRecoilValue(pcCidState)
  const [notifications, setNotifications] = useState([])

  // Setup real-time db stream for notifications
  useEffect(() => { 
    if (cid) {
      const unsubscribe = streamNotifications(cid, {
        next: querySnapshot => {
          const updatedNotifs = []
          querySnapshot.forEach((doc) => {
            updatedNotifs.push(doc.data())
          })            
          if (updatedNotifs)
            setNotifications(updatedNotifs)
        }
      })
      return () => unsubscribe()
    }
  }, [setNotifications])  

  return (
    <>
      <div id="notif-wrap">
        {notifications.length > 0 && notifications.map(x => <Notification key={x.nid} notif={x} />)}
      </div>
      <style jsx>{`
        #notif-wrap {
          border-top: solid 1px #303030;
        }
      `}</style>
    </>
  )
}


const Notification = (props) => {
  const {notif} = props

  return (
      <>
        {notif.type === "group" && <GroupNotification notif={notif} />}
      </>
  )
}


const GroupNotification = (props) => {
  const {notif} = props

  return (
    <>
      <div className="notif">
        <div id="msg-wrap">{notif.name} invited you to join the group.</div>
        <div id="btn-wrap">  
          <div className="btn" onClick={() => addGroupCharacter(notif.cid, notif.gid, notif.nid)}>Accept</div>
          <div className="btn" onClick={() => declineNotification(notif.nid)}>Decline</div>        
        </div>
      </div>
      <style jsx>{`
        .notif {
          font-size: 16px;
          background-image: linear-gradient(to right, #1a1a1a 95%, purple);
        }
        #msg-wrap {
          padding: 5px;
        }
        #btn-wrap {
          display: flex;
          justify-content: space-around;
          padding-bottom: 5px;
        }
        .btn {
          width: 60px;
          text-align: center;
          background-color: #303030;
        }
      `}</style>
    </>
  )
}


export default Notifications