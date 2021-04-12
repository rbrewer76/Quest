import {atom, selector} from 'recoil'
import {getItem} from '../fetch/items'

// stores a room's static data from file
export const roomState = atom({
  key: "roomState",
  default: ""
})


// stores a room's exits
export const roomExitsState = selector({
  key: "roomExitsState",
  get: ({get}) => {
    const x = get(roomState)
    return x.exits
  }  
})


// stores a room's instance from db, used for persistant data
export const roomPersistantState = atom({
  key: "roomPersistantState",
  default: ""
})


export const roomItemsDetailsState = selector({
  key: "roomItemsDetails",
  get: async ({get}) => {
    const room = get(roomPersistantState)
    let itemsExpanded = [] 
    if (room.items?.length > 0) {
      await Promise.all(room.items.map(async x => {
        let item =  await getItem(x)
        itemsExpanded.push(item)
      }))
    }    
    return itemsExpanded
  }
})