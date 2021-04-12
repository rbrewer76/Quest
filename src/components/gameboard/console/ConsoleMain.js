import FriendsList from './FriendsList'
import Notifications from './Notifications'

const ConsoleMain = () => {

  return (
    <>
      <div id="console-wrap">
        <div id="output-wrap">
          <div  id="tab-wrap">
            <div className="tab active">
              Global
            </div>
            <div className="tab">
              Group
            </div>
            <div className="tab">
              Whisper
            </div>                    
            <div className="tab">
              Combat
            </div>
            <div className="tab">
              System
            </div>                    
          </div>
          <div id="output">
            blaaah
          </div>
          <input id="input" />
        </div>
        <div id="friends-wrap">
          <FriendsList />
          <Notifications />
        </div>
      </div>
      <style jsx>{`
        #console-wrap {
          display: flex;
          margin: 5px;
          height: 100%;
          min-height: 230px;
          max-height: 450px;
          max-width: 910px;
          font-size: 16px;          
          background-color: #1a1a1a;
          border: solid 1px #303030;          
        }
        #output-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 75%;
          border-right: solid 1px #303030;
        }
        #tab-wrap {
          display: flex;
        }
        .tab {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 24px;
          border-right: solid 1px #303030;

        }
        #output {
          padding: 10px;
          height: 100%;
          border-top: solid 1px #303030;          
          border-bottom: solid 1px #303030;
        }
        #input {
          margin: 10px;
          color: white;
          background-color: #303030;
          border-width: 1px;
        }
        #friends-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 25%;          
        }
        .active {
          color: var(--orange1-color);
          background-color: #303030;
        }
      `}</style>
    </>
  )
}

export default ConsoleMain