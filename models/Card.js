const fs = require('fs')
const path = require('path')

const p = path.join(
    __dirname,
    '..',
    'data',
    'card.json'
)


class Card{


   static async add(equip){
        const card = await Card.fetch()
        const idx = card.equips.findIndex(c=> c.id.toString() === equip.id.toString())
        const candidate = card.equips[idx]

        if(candidate){
            candidate.count++
            card.equips[idx] = candidate
        }
        else{
            equip.count = 1
            card.equips.push(equip)
        }
 
        card.price += +equip.price

        return new Promise((res,rej)=>{
            fs.writeFile(p,JSON.stringify(card),(err)=>{
                if(err) rej(err)
                else res()
            })
        })


    }

    static async remove(id){
        const card = await Card.fetch()
        const idx = card.equips.findIndex(c=> c.id.toString()===id.toString())
        const candidate = card.equips[idx]
        if(card.equips[idx].count == 1){
            const equips = card.equips.filter(c=> c.id.toString() !== id.toString())  
            card.equips = equips
        }
        else{
            candidate.count--
            card.equips[idx] = candidate
        }
        card.price -= +candidate.price

        return new Promise((res,rej)=>{
            fs.writeFile(p,JSON.stringify(card),(err)=>{
                if(err) rej(err)
                else res(card)
            })
        })
    }
    
    static async fetch(){
        return new Promise((res,rej)=>{
            fs.readFile(p,'utf-8',(err,data)=>{
                if(err) rej(err)
                else res(JSON.parse(data))
            })
        })

    }

}

module.exports  = Card