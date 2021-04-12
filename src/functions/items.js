import {db} from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {setCharacter} from './character'
import {addItemToRoom, removeItemFromRoom} from './rooms'

// API function only - Do not call from client
// Add an item to a player's inventory
export const addItemToPlayerInv = async (invId, iid) => {
  await db.collection("inventories").doc(invId)
    .update({items: firebase.firestore.FieldValue.arrayUnion(iid)})
  return "ok"
}


// API function only - Do not call from client
// Add or subtract item stats to character on equip/unequip
export const calculateEquipedItem = async (cid, method, iid, slot) => {
  const char = await db.collection("characters").doc(cid)
    .get()
    .then(char => char.data())

  const item = await getItem(iid)
  let changes = {}

  const sign = (value) => {
    if (method === "unequip") 
      return (value * -1)
    return value
  }

  if (item.type === "weapon") {
    let accuracy = char[slot].accuracy
    let critical = char[slot].critical
    let armorpen = char[slot].armorpen
    let physical = char[slot].damage.physical
    let acid = char[slot].damage.acid
    let arcane = char[slot].damage.arcane
    let cold = char[slot].damage.cold
    let death = char[slot].damage.death
    let electric = char[slot].damage.electric
    let fire  = char[slot].damage.fire

    // if weapon is a precision weapon then use Agility instead of Might for Accuracy
    if (item.profile.mods.find(x => x === "Precision"))
      accuracy = accuracy + sign(-(char.att.might) + char.att.agility)

    // Enchantment
    item.profile.ench ? (accuracy = accuracy + sign(item.profile.ench)) : null
    item.profile.ench ? (physical = physical + sign(item.profile.ench)) : null

    // Enchantment Mods
    if (item.profile?.enchmods) {
      item.profile.enchmods?.accuracy ? (accuracy = accuracy + sign(item.profile.enchmods.accuracy)) : null 
      item.profile.enchmods?.critical ? (critical = critical + sign(item.profile.enchmods.critical)) : null
      item.profile.enchmods?.armorpen ? (armorpen = armorpen + sign(item.profile.enchmods.armorpen)) : null
      item.profile.enchmods?.physical ? (physical = physical + sign(item.profile.enchmods.physical)) : null
      item.profile.enchmods?.acid ? (acid = acid + sign(item.profile.enchmods.acid)) : null
      item.profile.enchmods?.arcane ? (arcane = arcane + sign(item.profile.enchmods.arcane)) : null
      item.profile.enchmods?.cold ? (cold = cold + sign(item.profile.enchmods.cold)) : null
      item.profile.enchmods?.death ? (death = death + sign(item.profile.enchmods.death)) : null
      item.profile.enchmods?.electric ? (electric = electric + sign(item.profile.enchmods.electric)) : null
      item.profile.enchmods?.fire ? (fire = fire + sign(item.profile.enchmods.fire)) : null
    }
    // build updated object to save to the character
    changes = 
    {
      [slot]: 
        {
        accuracy: accuracy, 
        critical: critical,
        armorpen: armorpen,
        damage: 
        {
          physical: physical,
          acid: acid,
          arcane: arcane,
          cold: cold,
          death: death,
          electric: electric,
          fire: fire
        }
      } 
    }
  }
  
  else if (item.type === "armor" || item.type === "shield") {
    let defense = char.defense
    let evasion = char.evasion
    let magicresist = char.magicresist
    let maxhp = char.hp.maxhp
    let acid = char.resist.acid
    let arcane = char.resist.arcane
    let cold = char.resist.cold
    let death = char.resist.death
    let electric = char.resist.electric
    let fire  = char.resist.fire
    let curse = char.saves.curse
    let disease = char.saves.disease
    let mind = char.saves.mind
    let poison = char.saves.poison
    let stagger = char.saves.stagger
    let stun = char.saves.stun
    let traps  = char.saves.traps
    
    // Defense
    item.profile.defense ? (defense = defense + sign(item.profile.defense)) : null
    if (item.type === "shield") 
      char.expertise["Shield Discipline"] ? (defense = defense + sign(char.expertise["Shield Discipline"])) : null

    // Enchantment
    item.profile?.ench ? (defense = defense + sign(item.profile.ench)) : null
    // Enchantment Mods
    item.profile.enchmods?.evasion ? (evasion = evasion + sign(item.profile.enchmods.evasion)) : null
    item.profile.enchmods?.defense ? (defense = defense + sign(item.profile.enchmods.defense)) : null    
    item.profile.enchmods?.magicresist ? (magicresist = magicresist + sign(item.profile.enchmods.magicresist)) : null    
    item.profile.enchmods?.maxhp ? (maxhp = maxhp + sign(item.profile.enchmods.maxhp)) : null    
    item.profile.enchmods?.acid ? (acid = acid + sign(item.profile.enchmods.acid)) : null    
    item.profile.enchmods?.arcane ? (arcane = arcane + sign(item.profile.enchmods.arcane)) : null    
    item.profile.enchmods?.cold ? (cold = cold + sign(item.profile.enchmods.cold)) : null    
    item.profile.enchmods?.death ? (death = death + sign(item.profile.enchmods.death)) : null    
    item.profile.enchmods?.electric ? (electric = electric + sign(item.profile.enchmods.electric)) : null    
    item.profile.enchmods?.fire ? (fire = fire + sign(item.profile.enchmods.fire)) : null            

    changes = {
      defense: defense,
      evasion: evasion,
      magicresist: magicresist,
      hp: {...char.hp, maxhp: maxhp},
      resist:
      {
        acid: acid,
        arcane: arcane,
        cold: cold,
        death: death,
        electric: electric,
        fire: fire
      },
      saves: 
      {
        curse: curse,
        disease: disease,
        mind: mind,
        poison: poison,
        stagger: stagger,
        stun: stun,
        traps: traps
      }
    }
    

  }  
  await setCharacter(char.cid, changes)
  return "ok"
}


// API function only - Do not call from client
// Create an instance of an item based on the passed iid and Add that item to an inventory
export const createItem = async (iid) => {
  let id = ""
  const item = require("../../data/items.json").find(x => x.iid === iid)
  await db.collection("items")
    .add({})
    .then(async response => {
      id = response.id
      await db.collection("items").doc(id)
        .set({id: id, ...item})
    })
  // return the item's id  
  return id
}


// API function only - Do not call from client
// Delete a single item of the provided id
export const deleteItem = async (id) => {
  await db.collection("items").doc(id)
    .delete()
  return "ok"
}


// API function only - Do not call from client
// Drop a single item to the player's current room
export const dropItem = async (invId, id, rid) => {
  await removeItemFromPlayerInv(invId, id)
  await addItemToRoom(id, rid)
  return "ok"
}


export const verifyRequireToEquip = (item, att, expertise) => {
  if (item.profile.require?.att?.might > att.might ||
    (item.profile.require?.expertise?.["Armor Training"] ?? 0) > (expertise?.["Armor Training"] ?? 0))
    return false
  return true
}

// API function only - Do not call from client
// Takes item out of inventory and equip it to its slot.
export const equipItem = async (cid, id, slot) => {
  const item = await getItem(id)
  let char = await db.collection("characters").doc(cid)
    .get()
    .then(char => char.data())

  // Verify require for equip
  if (!verifyRequireToEquip(item, char.att, char.expertise))
    return "no"

  // unequip any current item so it can be added to inventory
  if (char.equip[slot])
    await unequipItem(cid, char.equip[slot], slot)
  
  // if weapon and 2 handed, unequip offhand as well
  if (item.type === "weapon" && item.profile.hands === "2h") 
    if (char.equip.offhand) 
      await unequipItem(cid, char.equip.offhand, "offhand")

  // if 2 hand weapon already equiped, reject offhand equip
  if (slot === "offhand" && char.equip.mainhand) {
    const mainhand = await getItem(char.equip.mainhand) 
    if (mainhand.profile.hands === "2h")
      return "no"
  }

  // get new char details since items may have been unequiped
  char = await db.collection("characters").doc(cid)
    .get()
    .then(char => char.data())
  // remove the new item from inventory
  removeItemFromPlayerInv(char.inventory, id)
  // then equip the new item   
  db.collection("characters").doc(cid)
    .update({equip: {...char.equip, [slot]: id}})    
    .then(await calculateEquipedItem(cid, "equip", id, slot))
}


// API function only - Do not call from client
// Get an instance of an item from the DB
export const getItem = async (id) => {
  const res = await db.collection("items").doc(id)
    .get()
    .then(response => response.data())
  return res
}


// API function only - Do not call from client
// Remove an item from an inventory
export const removeItemFromPlayerInv = async (invId, id) => {
  await db.collection("inventories").doc(invId)
    .update({items: firebase.firestore.FieldValue.arrayRemove(id)})
  return "ok"
}


// API function only - Do not call from client
// Take a single item from a room and add to the player's inventory
export const takeItem = async (invId, id, rid) => {
  await removeItemFromRoom(id, rid)
  await addItemToPlayerInv(invId, id)  
  return "ok"
}


// API function only - Do not call from client
// Unequip item and add to inventory
export const unequipItem = async (cid, id, slot) => {
  const char = await db.collection("characters").doc(cid)
    .get()
    .then(char => char.data())

  await db.collection("characters").doc(cid)
    .update({equip: {...char.equip, [slot]: ""}})   
    .then(await calculateEquipedItem(cid, "unequip", id, slot))          
    // put item in inventory
    .then(addItemToPlayerInv(char.inventory, id))
  return "ok"

}