import {useEffect, useState} from 'react'
import {useRecoilValue, useRecoilState} from 'recoil'
import {friendsState} from '../../../store/store-friends'
import {pcUidState} from '../../../store/store-pc'
import {addFriend, getFriendCharacters, getFriends} from '../../../fetch/friends'
import {streamFriendCharacters} from '../../../functions/streams'

const FriendsList = () => {

  return (
    <>
      <div id="friends-wrap">
        <FriendsListToolbar />
        <FriendUserList />
      </div>
      <style jsx>{`
        #friends-wrap }
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          font-size: 16px;   
        }
        #friends-toolbar {
          display: flex;
          justify-content: center;
          height: 42px;
          border-bottom: solid 1px #303030;
        }
      `}</style>
    </>
  )
}


const FriendsListToolbar = () => {

  const friend = () => {
    console.log("clicked add friend +")
  }

  return (
    <>
      <div id="toolbar-wrap">
        <div id="user-wrap">
          <div className="icon" onClick={() => friend()}>+</div>
        </div>
      </div>
      <style>{`
        #toolbar-wrap {
          display: flex;
          height: auto;
          border-bottom: solid 1px #303030;
        }
        #user-wrap {
          display: flex;
        }      
        .icon {
          dispaly: flex;
          justify-content: center;
          text-align: center;
          margin: 3px;
          width: 15px;
        }
      `}</style>
    </>
  )
}


const FriendUserList = () => {
  const uid = useRecoilValue(pcUidState)
  const [friends, setFriends] = useRecoilState(friendsState)  

  useEffect(async () => {
    setFriends(await getFriends(uid))
  }, [friends.length])  

  return (
    <>
      <div className="friendswrap" > 
        {friends && friends.map(x => <FriendUser key={x.uid} friend={x} />)}
      </div>
      <style jsx>{`
        .friendswrap {
          height: 100%;
          overflow: auto;
          scrollbar-width: thin;
        }
      `}</style>
    </>
  )
}


const FriendUser = ({friend}) => {

  return (
    <>
      <div className="user">
        {friend.displayName}
        <FriendCharacterList uid={friend.uid} />
      </div>  
      <style>{`
        .user {
          margin: 5px;
          color: white;   
        }
      `}</style>
    </>
  )
}


const FriendCharacterList = ({uid}) => {
  const friends = useRecoilValue(friendsState) 
  const [chars, setChars] = useState([])

  // Setup the initial character list for a friend
  useEffect(async () => {
    setChars(await getFriendCharacters(uid))
  }, [friends])

  // Setup real-time db stream for each character of the friend
  useEffect(async () => {
    if (chars.length > 0) {
      let charsCid = []      
      chars.map(x => charsCid.push(x.cid))
      const unsubscribe = streamFriendCharacters(charsCid, {
        next: querySnapshot => setChars(querySnapshot)
      })
      return () => unsubscribe()
    }
  // setChars allows update after change of online state   
  // friends allows update after reload of page
  }, [chars.online, friends])  

  return (
    <>
      {chars && chars.map(x => <FriendCharacter key={x.cid} char={x} />)}
    </>
  )
}


const FriendCharacter = ({char}) => {
  const {name, lvl, cname, pic} = char
  const online = char.online ? "online" : "offline"

  return (
    <>
      <div className="wrap">
        <div>
          <img className="pic" src={pic} />
        </div>
        <div>
          <div className={"name " + online}>
            {name}
          </div>
          <div className={"info " + online}>
            {lvl} {cname}
          </div>
        </div>
      </div>        
      <style>{`
        .wrap {
          display: flex;
          align-items: center;
        }
        .pic {
          margin: 5px 10px 0  10px;
          max-width: 40px;
        }
        .offline {
          color: #303030;          
        }
        .name.online {
          color: green;
        }
        .info.online {
          color: white;
        }
      `}</style>
    </>
  )
}


export default FriendsList