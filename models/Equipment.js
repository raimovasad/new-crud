const {v4:uuid} = require('uuid')
const fs = require('fs')
const path = require('path')


class Equipment {
    constructor(title, price,image){
        this.title = title
        this.price = price,
        this.image = image
        this.id = uuid()
    }


    toJSON(){
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id:this.id
        }
    }

  async  save()  {
    
    const equips = await Equipment.getAll()
    equips.push(this.toJSON())
    return new Promise((res,rej)=>{
        fs.writeFile(path.join(__dirname,'..','data','equipments.json'),JSON.stringify(equips),(err)=>{
            if(err) rej(err)
            else res()
        })
    })


    }

    static async getById(id){
        const equips = await Equipment.getAll()
        const equip = equips.find(c=> c.id.toString() === id.toString())
        return equip

    }


   static getAll(){

   return new Promise((res,rej)=>{
        fs.readFile(path.join(__dirname,'..','data','equipments.json'),'utf-8',(err,data)=>{
            if(err) rej(err)
            else  res(JSON.parse(data))
        })
    })

    }

    static async update(equip){
        const equips = await Equipment.getAll()
        const idx = equips.findIndex(c=> c.id.toString() === equip.id.toString())
        equips[idx] = equip

        return new Promise((res,rej)=>{
            fs.writeFile(path.join(__dirname,'..','data','equipments.json'),JSON.stringify(equips),(err)=>{
                if(err) rej(err)
                else res()
            })
        })
        

    }
}

module.exports = Equipment