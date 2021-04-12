import {atom, selector} from 'recoil'

export const friendsState = atom({
  key: "friendsState",
  default: ""
})

/*
export const friendsCharactersState = atom({
  key: "friendsCharactersState",
  default: []
})


export const friendsCharactersReducedStatsState = selector({
  key: "friendsCharactersReducedStatsState",
  get: ({get}) => {
    const chars = get(friendsCharactersState)
    // Destructure to keep only needed group character fields
    const modifiedChars = chars.map(x => (({ uid, cid, name, lvl, cname, pic, online }) => 
    ({ uid, cid, name, lvl, cname, pic, online }))(x))
    modifiedChars.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase())
    return modifiedChars
  }
})
*/