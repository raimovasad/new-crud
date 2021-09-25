const {Router} = require('express')
const router = Router()
const Order = require('../models/Order')
const auth = require('../middleware/auth')



router.get('/',auth,async(req,res)=>{
    const orders = await Order.find({
        'user.userId': req.user._id
    }).populate('user.userId')
    res.render('order',{
        title: 'Order page',
        isOrder: true,
        orders: orders.map(x=>{
            return {
                ...x._doc,
                price: x.equips.reduce((total,c)=>{
                   return total += c.equip.price * c.count
                },0)
            }
            })
    })
})


router.post('/',auth,async(req,res)=>{
    const user = await req.user.populate('cart.items.equipId')
    const items = user.cart.items
    const equips = items.map(x=> ({
         count: x.count,
         equip: {...x.equipId._doc}
    }))
    const order = new Order({
        equips,
        user:{
            name: user.name,
            email: user.email,
            userId: user._id
        }
    })
    await req.user.clearCart()
    await order.save()


    res.redirect('/order')
})


module.exports = router