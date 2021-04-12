import {atom, selector} from 'recoil'
import {getItem} from '../fetch/items'

export const inventoryState = atom({
  key: "inventoryState",
  default: []
})


export const inventoryDetailsState = selector({
  key: "inventoryDetailsState",
  get: async ({get}) => {
    const inv = get(inventoryState)
    let itemsExpanded = [] 
    if (inv.items.length > 0) {
      await Promise.all(inv.items.map(async x => {
        let item =  await getItem(x)
        itemsExpanded.push(item)
      }))
    }    
    return itemsExpanded
  }
})