const {Router} = require('express')
const Equipment = require('../models/Equipment')
const router = Router()

router.get('/',(req,res)=>{
    res.render('add-equip',{
        title:'Add new Equipment',
        isAdd: true
    })
})

router.post('/',async(req,res)=>{
    const {title,price,image} = req.body
    const equip = new Equipment(title,price,image)

   await equip.save()
    
    res.redirect('/equip')
})




module.exports = router