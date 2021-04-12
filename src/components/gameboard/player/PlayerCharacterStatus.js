import {useRecoilValue} from 'recoil'
import {groupState} from '../../../store/store-group'
import StatusBar from './StatusBar'

const PlayerCharacterStatus = (props) => {
  const {cid, hp, grouplockstep, online} = props.char
  const group = useRecoilValue(groupState)
  const offline = online ? null : "offline"  

  const isGroupLeader = () => {
    if (group.leader && group.leader.cid === cid)
      return true
    return false
  }

  return (
    <>
      <div className={"status-wrap " + offline}>

        <div className="left-wrap">
          <div className="left">
            <div>
              {isGroupLeader() && <img id="crown" src="/icons/crown.png" />}
              {!isGroupLeader() && grouplockstep && <img id="lockstep" src="/icons/group-lockstep.png" />}
            </div>
            <div>HP</div>                        
          </div>
          <div className="left">
             
          </div>
          <div className="left">
      
          </div>
        </div>

        <div className="middle-wrap">
          <StatusBar name={"HP"} total={hp.maxhp} current={hp.currenthp} />
          <div className="buffs-wrap">
            buffs X X X X
          </div>
          <div className="debuffs-wrap">
            debuffs X
          </div>                
        </div>

        <div className="right-wrap">
          
        </div>        

      </div>
      <style jsx>{`
        .status-wrap {
          display: flex;
          margin: 5px;
          height: 75px;
          width: 446px;
          font-size: 16px;
          background-image: linear-gradient(to right, black, #303030 70%);
        }
        .left-wrap {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;          
          margin-left: 7px;
          width: 81px;
        }
        .left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 25px;
          width: 81px;
        }
        .middle-wrap {
          display: flex;
          flex-direction: column;
          margin: 0 18px;
        }
        .right-wrap {
          width: 25px;          
        }        
        .buffs-wrap {
          display: flex;
          align-items: center;          
          height: 25px;
        }
        .debuffs-wrap {
          display: flex;
          align-items: center;          
          height: 25px;
        }        
        #crown {
          width: 27px;
          height: auto;
        }
        #lockstep {
          width: 16px;
        }
        .offline {
          color: grey;
        }           
      `}</style>
    </>
  )
}


export default PlayerCharacterStatus