import {useState} from 'react'
import {useRecoilValue, useRecoilValueLoadable} from 'recoil'
import {useContext, useEffect} from 'react'
import {PlayerMobContext} from '../PlayMain'
import {pcCidState} from '../../../store/store-pc'
import {roomPersistantState, roomItemsDetailsState} from '../../../store/store-room'
import {takeItem} from '../../../fetch/items'
import styles from '../player/Inventory.module.css'

const LocationMain = () => {
  const cid = useRecoilValue(pcCidState)
  const roomPersistant = useRecoilValue(roomPersistantState)
  const roomItemsDetails = useRecoilValueLoadable(roomItemsDetailsState)
  const [items, setItems] = useState([])  

  useEffect(() => {
    if (roomItemsDetails.state === "hasValue")
      setItems(roomItemsDetails.contents)
  }, [roomItemsDetails.state])

  return(
    <>
      <div id="location-wrap">
      {roomPersistant.mobs && <MobList mobs={roomPersistant.mobs} />}        
      {roomPersistant.players && <PlayerList players={roomPersistant.players.filter(x => x.cid !== cid)} />}
      {items.length > 0 && <ItemList items={items} />}
            
      </div>
      <style jsx>{`
        #location-wrap {
          display: flex;
          flex-direction: column;
          margin: 5px;
          height: 100%;
          width: auto;
          max-width: 340px;
          font-size: 16px;
          background-color: #1a1a1a;
          border: solid 1px #303030;          
        }
      `}</style>
    </>
  )
}


const PlayerList = ({players}) => {

  return (
    <>
      {players.map(x => <Player key={x.cid} player={x} />)}
    </>        
  )
}


const Player = ({player}) => {
  const {selectedPlayer, setSelectedPlayer} = useContext(PlayerMobContext)  
  const active = (player.cid === selectedPlayer) ? "active" : null
  return (
    <>
      <div className={"player " + active} onClick={() => setSelectedPlayer(player.cid)}>{player.name}</div>
      <style jsx>{`
        .player {
          margin: 5px 7px;
          color: white;
        }
        .player:hover {
          background-color: #303030;
        }
        .active {
          margin-left: 0;
          padding-left: 5px;
          border-left: solid 2px var(--orange1-color);                    
        }
      `}</style>      

    </>
  )
}


const MobList = ({mobs}) => {

  return (
    <div id="mob-wrap">
      {mobs.map(x => <Mob key={x.id} mob={x} />)}
    </div>        
  )
}


const Mob = ({mob}) => {
  const {selectedMob, setSelectedMob} = useContext(PlayerMobContext)  
  let active = (mob.id === selectedMob) ? active = "active" : null
  return (
    <>
      <div className={"mob " + active} onClick={() => setSelectedMob(mob.id)}>{mob.name}</div>
      <style jsx>{`
        .mob {
          margin: 5px 7px;
          color: darkred;
        }
        .mob:hover {
          background-color: #303030;
        }
        .active {
          margin-left: 0;
          padding-left: 5px;
          border-left: solid 2px red;                    
        }
      `}</style>      

    </>
  )
}


const ItemList = ({items}) => {
  return (
    <>
      {items.map(x => <Item key={x.id} item={x} />)}
    </>        
  )
}


const Item = ({item}) => {
  const cid = useRecoilValue(pcCidState)

  return (
    <>
      <div className="itemwrap">
        <div className={"item " + styles[item.rarity]}>{item.name} {item.profile?.ench ? " +" + item.profile.ench : null} </div>
        <div className="options" onClick={() => takeItem(cid, item.id)}>
          <img src="../icons/pickup.png" />
        </div>
      </div>
      <style jsx>{`
        .itemwrap {
          display: flex;
          justify-content: space-between;
          margin: 5px 7px;
          height: 20px;
        }
        .itemwrap:hover {

        }
        .item {

        }
        .options {
          display: none;
        }
        .itemwrap:hover .options {
          display: inline;
        }
      `}</style>      
    </>
  )
}


export default LocationMain



/*

const LocationMain = () => {

  return(
    <>
      <div id="location-wrap">
        <div className="rank outer-rank top-rank">
          <div className="rank-desc">Rank 2</div>
          <div>Inzilleth</div>
          <div>Arza-Zaruk</div>          
        </div>
        <div className="rank inner-rank top-rank">
          <div className="rank-desc">Rank 1</div>
          <div>Alyena Sinblade</div>
          <div>Greypax</div>                                        
        </div>
        <div className="rank inner-rank bottom-rank">
          <div className="rank-desc rank-desc-bottom">Rank 1</div>
          <div>large spider</div>
          <div>large spider</div>          
          <div>large spider</div>                    
          <div>large spider</div>                    
          <div>large spider</div>                    
          <div>large spider</div>                    
        </div>
        <div className="rank outer-rank bottom-rank">
          <div className="rank-desc rank-desc-bottom">Rank 2</div>
          <div>flood of spiderlings</div>
        </div>                        
      </div>
      <style jsx>{`
        #location-wrap {
          display: flex;
          flex-direction: column;
          margin: 5px;
          width: 278px;
          font-size: 16px;
          background-color: #1a1a1a;
          border: solid 1px #303030;          
        }
        .rank {
          padding: 10px;
          height: 119.5px;
        }
        .inner-rank {
          border-top: solid 1px #303030;          
          border-bottom: solid 1px #303030;
        }
        .rank-desc {
          text-align: center;          
          font-size: 12px;
          color: darkgray;
        }
        .rank-desc-bottom {
          position: relative;
          top: 110px;
        }
      `}</style>
    </>
  )

}

export default LocationMain
*/