import {useEffect, useState} from 'react'
import {useRecoilValue, useRecoilValueLoadable} from 'recoil'
import {inventoryDetailsState} from '../../../store/store-inv'
import ToolbarButton from '../../utility/toolbar/ToolbarButton'
import {pcCidState, pcEquipState, pcEquipDetailsState, pcAttState, pcExpertiseState} from '../../../store/store-pc'
import Item from './PlayerInventoryItem'
import styles from './Inventory.module.css'
import {InventoryRarityFilter} from './PlayerInventory'
import {equipItem, unequipItem} from '../../../fetch/items'
import {verifyRequireToEquip} from '../../../functions/items'

const PlayerEquipment = () => {
  const [equipSlot, setEquipSlot] = useState(true)
  const [showEquip, setShowEquip] = useState(true)
  const [showInventory, setShowInventory] = useState(false)  
  const [currentItem, setCurrentItem] = useState({})

  return (
    <>
      <div id="equip-pane-wrap">
        {showEquip && <Equipment setShowEquip={setShowEquip} setShowInventory={setShowInventory} setEquipSlot={setEquipSlot} setCurrentItem={setCurrentItem} />}
        {showInventory && <SlotInventory setShowEquip={setShowEquip} setShowInventory={setShowInventory} equipSlot={equipSlot} currentItem={currentItem} />}   
      </div>
      <style jsx>{`
        #equip-pane-wrap {
          font-size: 16px;
        }
      `}</style>
    </>
  )
}


const Equipment = (props) => {
  const {setShowEquip, setShowInventory, setEquipSlot, setCurrentItem} = props
  const equip = useRecoilValue(pcEquipState)
  const [items, setItems] = useState(equip)
  const pcEquipDetails = useRecoilValueLoadable(pcEquipDetailsState)  

  // Assign items from the store after the loadable changes state since no React Suspense
  useEffect(async () => {
    if (pcEquipDetails.state == "hasValue") 
      setItems(pcEquipDetails.contents)
  }, [pcEquipDetails.state])


  const openInvSlot = (slot) => {
    setEquipSlot(slot)
    setShowEquip(false)
    setShowInventory(true)
    setCurrentItem(items[slot])
  }

  return (
    <div id="equip-wrap">
      <div className="eq-left-wrap">
        <div className="eq-node">
          <ToolbarButton id="head" img={"/icons/equip/eq-head.png"} propFunction={() => openInvSlot("head")} />
          <span className={styles[items.head.rarity]}>{items.head.name}</span>
        </div>
        <div className="eq-node">     
          <ToolbarButton id="body" img={"/icons/equip/eq-body.png"} propFunction={() => openInvSlot("body")} />
          <span className={styles[items.body.rarity]}>{items.body.name}
            {items.body?.profile?.ench ? " +" + items.body.profile.ench : ""}
          </span>
        </div>          
        <div className="eq-node">
          <ToolbarButton id="hands" img={"/icons/equip/eq-hands.png"} propFunction={() => openInvSlot("hands")} />
          <span className={styles[items.hands.rarity]}>{items.hands.name}</span>
        </div>          
        <div className="eq-node">
          <ToolbarButton id="boots" img={"/icons/equip/eq-boots.png"} propFunction={() => openInvSlot("boots")} />
          <span className={styles[items.boots.rarity]}>{items.boots.name}</span>
        </div>          
        <div className="eq-node">
          <ToolbarButton id="ranged" img={"/icons/equip/eq-ranged.png"} propFunction={() => openInvSlot("ranged")} />
          <span className={styles[items.ranged.rarity]}>{items.ranged.name}</span>
        </div>          
        <div className="eq-node">
          <ToolbarButton id="mainhand" img={"/icons/equip/eq-mainhand.png"} propFunction={() => openInvSlot("mainhand")} />
          <span className={styles[items.mainhand.rarity]}>{items.mainhand.name} 
            {items.mainhand?.profile?.ench ? " +" + items.mainhand.profile.ench : ""}
          </span>
        </div>
      </div>
      <div className="eq-right-wrap">
        <div className="eq-node"> 
          <span className={styles[items.back.rarity]}>{items.back.name}</span>
          <ToolbarButton id="back" img={"/icons/equip/eq-back.png"} propFunction={() => openInvSlot("back")} />
        </div>          
        <div className="eq-node">  
          <span className={styles[items.belt.rarity]}>{items.belt.name}</span>
          <ToolbarButton id="belt" img={"/icons/equip/eq-belt.png"} propFunction={() => openInvSlot("belt")} />
        </div>          
        <div className="eq-node">
          <span className={styles[items.neck.rarity]}>{items.neck.name}</span>
          <ToolbarButton id="neck" img={"/icons/equip/eq-neck.png"} propFunction={() => openInvSlot("neck")} />
        </div>          
        <div className="eq-node">
          <span className={styles[items.ring1.rarity]}>{items.ring1.name}</span>
          <ToolbarButton id="ring1" img={"/icons/equip/eq-ring.png"} propFunction={() => openInvSlot("ring1")} />
        </div>          
        <div className="eq-node">
          <span className={styles[items.ring2.rarity]}>{items.ring2.name}</span>
          <ToolbarButton id="ring2" img={"/icons/equip/eq-ring.png"} propFunction={() => openInvSlot("ring2")} />
        </div>          
        <div className="eq-node">
          <span className={styles[items.offhand.rarity]}>{items.offhand.name}
            {items.offhand?.profile?.ench ? " +" + items.offhand.profile.ench : ""}
          </span>
          <ToolbarButton id="offhand" img={"/icons/equip/eq-offhand.png"} propFunction={() => openInvSlot("offhand")} />
        </div>          
      </div>        
    <style jsx>{`
      #equip-wrap {
        display: flex;
        height: 324px;
      }
      .eq-left-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
      }
      .eq-right-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 50%;
      }        
      .eq-node {
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
  )
}


const SlotInventory = (props) => {
  const {currentItem, equipSlot, setShowEquip, setShowInventory} = props
  const [items, setItems] = useState([])
  const [filterRarity, setFilterRarity] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const inventoryDetails = useRecoilValueLoadable(inventoryDetailsState)

  useEffect(() => {
    if (inventoryDetails.state == "hasValue") {
      let itemsExpanded = []    
      inventoryDetails.contents.map(x => {
        if (x.slot.find(x => x === equipSlot))
          itemsExpanded.push(x)
      })
      setItems(itemsExpanded)
    }
  }, [inventoryDetails.state])

   // Filtered by rarity items array
  useEffect(() => {
    filterRarity ? setFilteredItems(items.filter(x => x.rarity === filterRarity)) : setFilteredItems(items)
  }, [items, filterRarity])

  const cancel = () => {
    setShowEquip(true)
    setShowInventory(false)   
  }

  return (
    <div id={styles.invwrap}>
      <div id={styles.raritytoolbar}>
        <InventoryRarityFilter setFilterRarity={setFilterRarity} />
        <div onClick={() => cancel()}><img src="/icons/x.svg" /></div>
      </div>
      {currentItem && <ItemWithCurrentEquip item={currentItem} equipSlot={equipSlot} setShowEquip={setShowEquip} setShowInventory={setShowInventory} />}
      {filteredItems.length > 0 && filteredItems.map(x => <ItemWithCanEquip key={x.id} item={x} setShowEquip={setShowEquip} setShowInventory={setShowInventory} equipSlot={equipSlot} />)}
    </div>
  )
}


export const ItemWithCurrentEquip = ({item, equipSlot}) => {
  const cid = useRecoilValue(pcCidState)

  const unequip = async () => {
    unequipItem(cid, currentItem.id, equipSlot)
    setShowEquip(true)    
    setShowInventory(false)
  }

  return (
    <>
      <div>
        {item && <div onClick={() => unequip()}>Unequip</div>}
        <Item item={item} />        
      </div>     
    </>
  )
}


export const ItemWithCanEquip = (props) => {
  const {item, equipSlot, setShowEquip, setShowInventory} = props
  const cid = useRecoilValue(pcCidState)
  const att = useRecoilValue(pcAttState)
  const expertise = useRecoilValue(pcExpertiseState)

  const equip = async () => {
    // Verify require for equip
    if (!verifyRequireToEquip(item, att, expertise))
      return "no"

    await equipItem(cid, item.id, equipSlot)
    setShowEquip(true)    
    setShowInventory(false)
  }

  return (
    <div onClick={() => equip()}>
      <Item item={item} />
    </div>    
  )
}


export default PlayerEquipment