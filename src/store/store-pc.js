import {atom, selector} from 'recoil'
import {getItem} from '../fetch/items'

export const pcState = atom({
  key: "pcState",
  default: ""
})


export const pcUidState = selector({
  key: "pcUidState",
  get: ({get}) => {
    const x = get(pcState)
    return x.uid
  }  
})


export const pcCidState = selector({
  key: "pcCidState",
  get: ({get}) => {
    const x = get(pcState)
    return x.cid
  }  
})


export const pcCurrentRoomState = selector({
  key: "pcCurrentRoomState",
  get: ({get}) => {
    const x = get(pcState)
    return x.currentroom
  }  
})


export const pcEquipState = selector({
  key: "pcEquipState",
  get: ({get}) => {
    const x = get(pcState)
    return x.equip
  }  
})


export const pcEquipDetailsState = selector({
  key: "pcEquipDetailsState",
  get: async ({get}) => {
    const x = get(pcEquipState)
    let itemsExpanded = x    
    for (const prop in x) {
      if (x[prop])
        itemsExpanded = {...itemsExpanded, [prop]: await getItem(x[prop])}
    }
    return itemsExpanded
  }  
})


export const pcAttState = selector({
  key: "pcAttState",
  get: ({get}) => {
    const x = get(pcState)
    return x.att
  }  
})


export const pcExpertiseState = selector({
  key: "pcExpertiseState",
  get: ({get}) => {
    const x = get(pcState)
    return x.expertise
  }  
})


export const pcOnlineState = selector({
  key: "pcOnlineState",
  get: ({get}) => {
    const x = get(pcState)
    return x.online
  }
})

export const pcHpState = selector({
  key: "pcHpState",
  get: ({get}) => {
    const x = get(pcState)
    return x.hp
  }
})


export const pcGoldState = selector({
  key: "pcGoldState",
  get: ({get}) => {
    const x = get(pcState)
    return x.gold
  }
})


export const pcFriendsState = selector({
  key: "pcFriendsState",
  get: ({get}) => {
    const x = get(pcState)
    return x.friends
  }  
})


