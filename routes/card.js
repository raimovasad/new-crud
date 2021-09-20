const {Router} = require('express')
const Card = require('../models/Card')
const Equipment = require('../models/Equipment')

const router = Router()

router.get('/',async(req,res)=>{
        const {equips,price} = await Card.fetch()
    
    res.render('card',{
        title: 'Shoplist',
        equips,
        price,
        isCard: true
    })
})

router.post('/add',async(req,res)=>{
    const equip = await Equipment.getById(req.body.id)
    await Card.add(equip)
    res.redirect('/card')
})

router.delete('/remove/:id',async(req,res)=>{
    
   const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})


 
module.exports = router