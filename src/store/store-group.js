import {atom, selector} from 'recoil'

export const groupState = atom({
  key: "groupState",
  default: ""
})


export const groupCharactersState = atom({
  key: "groupCharactersState",
  default: []
})


export const groupCharactersReducedStatsState = selector({
  key: "groupCharactersReducedStatsState",
  get: ({get}) => {
    const chars = get(groupCharactersState)
    // Destructure to keep only needed group character fields
    let modifiedChars = chars.map(x => (({ uid, cid, name, lvl, cname, pic, hp, grouplockstep, online }) => 
    ({ uid, cid, name, lvl, cname, pic, hp, grouplockstep, online }))(x))
    modifiedChars.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase())
    return modifiedChars
  }
})