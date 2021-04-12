import {useRecoilValue} from 'recoil'
import {pcCidState} from '../../../store/store-pc'
import styles from './Inventory.module.css'
import {capitalizeFirstLetter} from '../../../functions/utility'
import {destroyItem, dropItem} from '../../../fetch/items'

const Item = ({item}) => {
  const enchmods = item.profile.enchmods ? Object.entries(item.profile.enchmods) : []  
  const requireAtt = item.profile.require?.att ? Object.entries(item.profile.require.att) : []  
  const requireExpertise = item.profile.require?.expertise ? Object.entries(item.profile.require.expertise) : []      
  const cid = useRecoilValue(pcCidState)

  let type = ""
  if (item.type === "weapon") 
    type = <ItemWeapon item={item} />
  else if (item.type === "armor" || item.type === "shield") 
    type = <ItemArmor item={item} />    
  
  return (
    <>
      <div className={styles.itemwrap}>
        <div>
          <div className={styles.name + " " + styles.item + " " + styles[item.rarity]}>{item.name} {item.profile.ench ? " +" + item.profile.ench : null}
          <div>
            <div className={styles.drop} onClick={() => dropItem(cid, item.id)}><img src="../icons/drop.png" /></div>
            <div className={styles.drop} onClick={() => destroyItem(cid, item.id)}><img src="../icons/destroy.png" /></div>
          </div></div>      
        </div>
        {type}
        <div className={styles.mods}>
          <div>{enchmods.map(x => capitalizeFirstLetter(x[0]) + " +" + x[1] + " ")}</div>
        </div>
        <div className={styles.require}>
          <div><i>{requireAtt.length > 0 ? "Require: " : null}{requireAtt.map(x => capitalizeFirstLetter(x[0]) + ": " + x[1] + " ")}</i></div>
          <div><i>{requireExpertise.length > 0 ? "Require: " : null} {requireExpertise.map(x => capitalizeFirstLetter(x[0]) + ": " + x[1] + " ")}</i></div>
        </div>
      </div>
    </>
  )
}


const ItemWeapon = ({item}) => {

  return (
  <>
    <div className={styles.col}>
      <div className={styles.left}>
        <div className={styles.line}><img src="\icons\damage\dam-light.png" /> {item.profile.damage.light} Damage</div>
        <div className={styles.line}><img src="\icons\damage\dam-moderate.png" /> {item.profile.damage.moderate} Damage</div>
        <div className={styles.line}><img src="\icons\damage\dam-severe.png" /> {item.profile.damage.severe} Damage</div>
      </div>                
      <div className={styles.right}>
        <div>{capitalizeFirstLetter(item.type)} {(item.profile.hands === "1h" ? "1-Hand" + " " : "2-Hands")}</div>
        <div>{item.slot.map(x => capitalizeFirstLetter(x) + " ")}</div>
        <div>{item.profile.mods.map(x => x + " ")}</div>
      </div>
    </div>
    <style>{`
      img {
        margin-right: 5px;
      }
    `}</style>
  </>
  )
}


const ItemArmor = ({item}) => {

  return (
    <>
      <div className={styles.col}>
        <div className={styles.left}>       
          <div className={styles.line}><img src="\icons\damage\defense.png" /> {item.profile.defense} Defense</div>
        </div>
        <div className={styles.right}>
          <div>{capitalizeFirstLetter(item.type)}</div>
          <div>{item.slot.map(x => capitalizeFirstLetter(x) + "  ")}</div>
          <div>{item.profile.mods.map(x => x + " ")}</div>
        </div>        
      </div>
      <style jsx>{`
        img {
          margin-right: 5px;
        }
      `}</style>
    </>
  )
}


export default Item