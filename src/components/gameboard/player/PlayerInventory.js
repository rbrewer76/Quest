import {useContext, useEffect, useState} from 'react'
import {DisplayContext} from '../PlayMain'
import {useRecoilValue, useRecoilValueLoadable} from 'recoil'
import {inventoryDetailsState} from '../../../store/store-inv'
import {pcGoldState} from '../../../store/store-pc'
import styles from './Inventory.module.css'
import Item from './PlayerInventoryItem'

const PlayerInventory = () => {
  const {setShowInventory} = useContext(DisplayContext) 
  const inventoryDetails = useRecoilValueLoadable(inventoryDetailsState)
  const gold = useRecoilValue(pcGoldState)
  const [items, setItems] = useState([])
  const [filterRarity, setFilterRarity] = useState("")
  const [filteredItems, setFilteredItems] = useState([])

  // Assign items from the store after the loadable changes state since no React Suspense
  useEffect(() => {
    if (inventoryDetails.state == "hasValue") 
      setItems(inventoryDetails.contents)
  }, [inventoryDetails.state])


  // Filtered by rarity items array
  useEffect(() => {
    filterRarity ? setFilteredItems(items.filter(x => x.rarity === filterRarity)) : setFilteredItems(items)
  }, [items, filterRarity])

  return (
    <>
      <div id={styles.invwrap}>
        <div id={styles.raritytoolbar}>
          <InventoryRarityFilter setFilterRarity={setFilterRarity} />
          <div onClick={() => setShowInventory(false)}><img src="/icons/x.svg" /></div>
        </div>
        <div className={styles.currencywrap}><img src="/icons/gold.jpg" />{gold}</div>
        {filteredItems.length > 0 && filteredItems.map(x => <Item key={x.id} item={x} />)}
      </div>
    </>
  )
}


export const InventoryRarityFilter = ({setFilterRarity}) => {

  return (
    <div id={styles.raritywrap}>
      <div className={styles.filter + " " + styles.normal} onClick={() => setFilterRarity("normal")}></div>
      <div className={styles.filter + " " + styles.uncommon} onClick={() => setFilterRarity("uncommon")}></div>
      <div className={styles.filter + " " + styles.rare} onClick={() => setFilterRarity("rare")}></div>
      <div className={styles.filter + " " + styles.epic} onClick={() => setFilterRarity("epic")}></div>
      <div className={styles.filter + " " + styles.unique} onClick={() => setFilterRarity("unique")}></div>
      <div className={styles.filter + " " + styles.all} onClick={() => setFilterRarity("")}></div>      
    </div>
  )  
}


export default PlayerInventory 