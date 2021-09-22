const {Router} = require('express')
const Equipment = require('../models/Equipment')

const router = Router()

function mapCartItems (cart){
    return cart.items.map(c=>({
        ...c.equipId._doc, count: c.count
    }))

}

function totalPrice(equips) { 
    return equips.reduce((total, c)=>{
        return total += c.count * c.price
    },0)
 }

router.get('/',async(req,res)=>{
    const user = await req.user.populate('cart.items.equipId')
   
    const equips = mapCartItems(user.cart)
    res.render('card',{
        title: 'Shoplist',
        price:totalPrice(equips),
        equips,
        isCard: true
    })
})

router.post('/add',async(req,res)=>{
    const {_id,title,price,image,userId} = await Equipment.findById(req.body.id)
    const equip = {
        _id,
        title,
        price,
        image,
        userId
    }
   await req.user.addToCart(equip)
    res.redirect('/card')
})

router.delete('/remove/:id',async(req,res)=>{
    await req.user.removeFromCart(req.params.id)
    const user =await req.user.populate('cart.items.equipId')
    const equips = mapCartItems(user.cart)
    const cart = {
        equips,
        price: totalPrice(equips)
    }
    res.status(200).json(cart) 
}) 

 
 
module.exports = router