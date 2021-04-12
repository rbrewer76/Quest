import {useRecoilValue} from 'recoil'
import {pcState} from '../../../store/store-pc'
import styles from './PlayerStats.module.css'
import {capitalizeFirstLetter} from '../../../functions/utility'

const PlayerStats = () => {
  const pc = useRecoilValue(pcState)
  const attOrder = ["might", "agility", "resilience", "discipline", "aptitude", "arcane"]


  return (
    <>
      <div id="stats-wrap">
        <div className="section-wrap">
          <div className={styles.colwrap}>
            <OrderedListPane type={"Attributes"} order={attOrder} list={pc.att} />
          </div>
          <div className={styles.colwrap}>
            <DefensiveListPane hp={pc.hp} evasion={pc.evasion} defense={pc.defense} magicresist={pc.magicresist} />
            <AlphaListPane type={"Resistances"} list={pc.resist} /> 
          </div>
          <div className={styles.colwrap}>
            <AlphaListPane type={"Saves"} list={pc.saves} />
            {pc.arcanespec.length > 0 && <MagicListPane arcanespec={pc.arcanespec} concentration={pc.concentration} counterspell={pc.counterspell} />}
          </div>
        </div>
        <div className="section-wrap">        
          <OffensivePane mainhand={pc.mainhand} offhand={pc.offhand} ranged={pc.ranged} />
        </div>        
        <div className="section-wrap">
          <div className={styles.colwrap}>
            <AlphaListPane type={"Skills"} list={pc.skills} />
          </div>
          <div className={styles.colwrap}>
            <AlphaListPane type={"Expertise"} list={pc.expertise} />      
          </div>
        </div>
      </div>
      <style jsx>{`
        #stats-wrap {
          position: absolute;          
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 5px;          
          height: calc(100vh - 20px);
          width: 450px;            
          font-size: 16px;
          overflow: auto;
          scrollbar-width: thin;    


          background-color: black;          
        }
        .section-wrap {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}


const DefensiveListPane = ({hp, evasion, defense, magicresist}) => {
  const list = {evasion: evasion, defense: defense}
  const defensiveOrder = ["evasion", "defense"]

  return (
    <>
      <div className={styles.title}>Defensive</div>                          
      <div className={styles.statwrap}>  
        <span className={styles.stat}>HP: </span>
        <div>
          <span className={styles.value}>{hp.currenthp}</span><span className="divider"> / </span><span className={styles.value}>{hp.maxhp}</span>
        </div>
      </div>
      <OrderedListPane order={defensiveOrder} list={list} />
      <div className={styles.statwrap}>          
        <span className={styles.stat}>Magic Resistance</span><span className={styles.value}>{magicresist}</span>
      </div>      
      <style jsx>{`
        .divider {
          color: var(--orange1-color);
        }
      `}</style>
    </>
  )
}


const OffensivePane = ({mainhand, offhand, ranged}) => {
  const mainhandList = {accuracy: mainhand.accuracy, armorpen: mainhand.armorpen, critical: mainhand.critical}
  const offhandList = {accuracy: offhand.accuracy, armorpen:offhand.armorpen, critical: offhand.critical}
  const rangedList = {accuracy: ranged.accuracy, armorpen: ranged.armorpen, critical: ranged.critical}    
  const offensiveOrder = ["accuracy", "critical", "armorpen"]
  const damageOrder = ["physical", "acid", "arcane", "cold", "death", "electric", "fire"]    

  return (
    <>
      <div className={styles.colwrap}>
        <OrderedListPane type={"Mainhand"} order={offensiveOrder} list={mainhandList} /> 
        <OrderedListPane type={"Damage"} order={damageOrder} list={mainhand.damage} /> 
      </div>
      <div className={styles.colwrap}>
        <OrderedListPane type={"Offhand"} order={offensiveOrder} list={offhandList} />         
        <OrderedListPane type={"Damage"} order={damageOrder} list={offhand.damage} /> 
      </div>
      <div className={styles.colwrap}>
        <OrderedListPane type={"Ranged"} order={offensiveOrder} list={rangedList} />         
        <OrderedListPane type={"Damage"} order={damageOrder} list={ranged.damage} /> 
      </div>      
    </>
  )
}


const MagicListPane = ({arcanespec, concentration, counterspell}) => {
  const magicList = {concentration: concentration, counterspell: counterspell}
  const magicOrder = ["concentration", "counterspell"]

  return (
    <>
      <OrderedListPane type={"Magic"} order={magicOrder} list={magicList} />
      <div className={styles.title}>Arcane Specializations</div>
      {arcanespec.map(x => 
        <div key={x} className={"center " + styles.stat}>{x}</div>
      )}
      <style jsx>{`
        .center {
          text-align: center;
        }
      `}</style>
    </>
  )
}


// list = an object
// type is also the name dispayed
const AlphaListPane = ({type, list}) => {

  return (
    <>
      <div className={styles.title}>{type}</div>
      {Object.entries(list).sort().map(x => 
        <div key={x[0]} className={styles.statwrap}>          
          <span className={styles.stat}>
            {type === "Saves" || type === "Resistances" ? "+ vs " : null}
            {capitalizeFirstLetter(x[0])} </span><span className={styles.value}>{x[1]}</span>
        </div>
      )}
    </>
  )
}


// order = an ordered array of keys
// list = an array of objects
// type is also the name dispayed
const OrderedListPane = ({type, order, list}) => {

  return (
    <>
      {type && <div className={styles.title}>{type}</div>}
      {order.map(x => 
        <div key={x} className={styles.statwrap}>
          <span className={styles.stat}>
            {type === "Mainhand" || type === "Offhand" || type === "Ranged" || 
             type === "Damage" ? "+ " : null}
            {capitalizeFirstLetter(x)}: </span><span className={styles.value}>{list[x]}</span>
        </div>        
      )}
    </>
  )
}


export default PlayerStats