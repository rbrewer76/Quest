import {db} from '../../config/firebase'

// Imports for createCharacter
import {createInventory} from './inventories'
import {createItem, addItemToPlayerInv} from './items'

// Imports for deleteCharacter
import {leaveGroup} from './group'
import {deleteInventory} from './inventories'
import {deleteItem} from './items'


const classStartingPackage = async (inv, cname) => {
  switch (cname) {
    case "Bard":
      addItemToPlayerInv(inv, await createItem("201")) 
      addItemToPlayerInv(inv, await createItem("101"))           
      addItemToPlayerInv(inv, await createItem("103"))             
      break
    case "Cleric":
      addItemToPlayerInv(inv, await createItem("200")) 
      addItemToPlayerInv(inv, await createItem("104"))
      addItemToPlayerInv(inv, await createItem("230"))                                  
      break          
    case "Druid":
      addItemToPlayerInv(inv, await createItem("201"))
      addItemToPlayerInv(inv, await createItem("128"))
      addItemToPlayerInv(inv, await createItem("230"))           
      break          
    case "Paladin":
      addItemToPlayerInv(inv, await createItem("201"))
      addItemToPlayerInv(inv, await createItem("231"))
      addItemToPlayerInv(inv, await createItem("120"))                                                                     
      break        
    case "Rogue":
      addItemToPlayerInv(inv, await createItem("201"))
      addItemToPlayerInv(inv, await createItem("101")) 
      addItemToPlayerInv(inv, await createItem("101"))                               
      break          
    case "Sorcerer":
      addItemToPlayerInv(inv, await createItem("200"))
      addItemToPlayerInv(inv, await createItem("130"))           
      break
    case "Warrior":
      addItemToPlayerInv(inv, await createItem("201"))
      addItemToPlayerInv(inv, await createItem("120")) 
      addItemToPlayerInv(inv, await createItem("231"))
      addItemToPlayerInv(inv, await createItem("620")) 
      addItemToPlayerInv(inv, await createItem("621"))       
      addItemToPlayerInv(inv, await createItem("200"))                
      addItemToPlayerInv(inv, await createItem("200"))                
      addItemToPlayerInv(inv, await createItem("200"))                
      addItemToPlayerInv(inv, await createItem("622")) 
      addItemToPlayerInv(inv, await createItem("623"))
      addItemToPlayerInv(inv, await createItem("101"))                                              
      break
    }
}


// API function only - Do not call from client
// create a new character from the passed data
export const createCharacter = async (uid, name, cname, pic) => {
  const newClass = require("../../data/class.json").find(x => x.name === cname)
  const {att} = newClass

  const initialSkills = () => {
    let skills = {}
    newClass.skills.map(x => skills[`${x}`] = 1)
    return skills
  }

  const initialExpertise = () => {
    let expertise = {}
    newClass.expertise.map(x => expertise[`${x}`] = 1)
    return expertise
  }

  const skills = initialSkills()  
  const expertise = initialExpertise()

  await db.collection("characters")
    .add({})
    .then(async response => {
      await db.collection("characters").doc(response.id)
        .set({
          uid: uid,
          cid: response.id,
          name: name,
          cname: cname,
          lvl: 1,
          pic: pic,
          // attributes           
          att: 
          {
            might: att[0],
            agility: att[1],
            resilience: att[2],
            discipline: att[3],
            aptitude: att[4],
            arcane: att[5]  
          },
          skills: skills,
          expertise: expertise,
          exp: 
          {
            currentexp: 0,
            neededexp: 1000
          },            
          // stats
          hp: 
          {
            maxhp: 10 + att[2] + (expertise.Vitality ? expertise.Vitality : 0),
            currenthp: 10 + att[2] + (expertise.Vitality ? expertise.Vitality : 0)
          },
          mainhand: 
          {
            accuracy: att[0],               
            armorpen: 0,
            critical: 0,
            damage: {physical: att[0], acid: 0, arcane: 0, cold: 0, fire: 0, death: 0, electric: 0}                     
          },
          offhand: 
          {
            accuracy: att[0],               
            armorpen: 0,
            critical: 0,
            damage: {physical: att[0], acid: 0, arcane: 0, cold: 0, fire: 0, death: 0, electric: 0}                     
          },
          ranged: 
          {
            accuracy: att[1],               
            armorpen: 0,
            critical: 0,
            damage: {physical: 0, acid: 0, arcane: 0, cold: 0, fire: 0, death: 0, electric: 0}                      
          },                 
          evasion: att[1] + (expertise.Dodge ? expertise.Dodge : 0),
          defense: 0,
          resist: {acid: 0, arcane: 0, cold: 0, fire: 0, death: 0, electric: 0},
          saves: {curse: 0, disease: att[2], mind: att[4], poison: att[2], stagger: att[2], stun: att[2], traps: att[1]},
          magicresist: 0,
          arcanespec: newClass.arcanespec,
          concentration: att[3] + (expertise["Battle Mage"] ? expertise["Battle Mage"] : 0),
          counterspell: 0 + (expertise.Counterspelling ? expertise.Counterspelling : 0),
          buffs: [],
          debuffs: [],
          gold: 0,
          inventory: "",
          equip: {head: "", body: "", hands: "", boots: "", back: "", belt: "", ring1: "", ring2: "", neck: "", mainhand: "", offhand: "", ranged: ""},
          gid: "",
          grouplockstep: false,
          currentroom: "400",
          online: false
        })
        .catch(error => console.log(error))
        // Create the new player's inventory
        let newInv = await createInventory(response.id)
        await db.collection("characters").doc(response.id)
          .update({inventory: newInv})
          .catch(error => console.log(error))
        // create starting items for each class
        classStartingPackage(newInv, cname)
    })
}


// API function only - Do not call from client
// delete a single character with the passed cid
export const deleteCharacter = async (cid) => {
  const res = await db.collection("characters").doc(cid)
  .get()
  .then(response => response.data())

  // Remove character from any group
  if (res.gid) {
    console.log(res.cid + "     " + res.gid)
    await leaveGroup(res.cid, res.gid)   
  }

  // Delete the character's inventory
  await deleteInventory(res.inventory)      

  // Delete the character's equiped items
  const equip = res.equip
  for(const prop in equip ) {
    if (equip[prop])
      deleteItem(equip[prop])
  }

  // Remove the character
  await db.collection("characters").doc(cid)
    .delete()
  return "ok"
}


// API function only - Do not call from client
// gets a single character from the passed cid
export const getCharacter = async (cid) => {
  const res = await db.collection('characters').doc(cid)
  .get()
  .then(response => response.data())
  return res
}


// API function only - Do not call from client
// sets a character's data to data passed in.
// passed data should be a collection of key/value pairs
export const setCharacter = async (cid, data) => {
  await db.collection("characters").doc(cid)
  .update(data)
  return "ok"
}