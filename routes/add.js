const {Router} = require('express')
const Equipment = require('../models/Equipment')
const router = Router()
const auth = require('../middleware/auth')



router.get('/',auth,(req,res)=>{
    res.render('add-equip',{
        title:'Add new Equipment',
        isAdd: true
    })
})

router.post('/',auth,async(req,res)=>{
    const {title,price,image} = req.body
    const equip = new Equipment ({
        title,
        price,
        image,
        userId: req.session.user
    })
    try{
        await equip.save()
        res.redirect('/equip')
    }
    catch(er){
        console.log(er);
    }
    
})




module.exports = router