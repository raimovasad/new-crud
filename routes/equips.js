const {Router} = require('express')
const router = Router()
const Equipment = require('../models/Equipment')



router.get('/',async(req,res)=>{
const equips = await Equipment.find()
.populate('userId','name email')
.select('title image price')
    res.render('equipments',{
        title:'Equipments',
        isEquip: true,
        equips
    })
})

router.get('/:id',async(req,res)=>{
    const equip = await Equipment.findById(req.params.id)
    res.render('equip',{
        title: `${equip.title}`,
        equip,
        layout: 'empty'
    })
})


router.get('/edit/:id',async(req,res)=>{
    const equips = await Equipment.find()
    const equip = equips.find(c=> c.id.toString() === req.params.id.toString())
    res.render('edit-equip',{
        title: `Edit ${equip.title}`,
        equip
    })
})

    router.post('/remove',async(req,res)=>{
        try{
            await Equipment.deleteOne({
                _id: req.body.id
            })
            res.redirect('/equip')
        }
        catch(e){
            console.log(e);
        }
    })

router.post('/edit',async(req,res)=>{
  
    const {id}= req.body

    await Equipment.findByIdAndUpdate(id,req.body)
    res.redirect('/equip')
    
})



module.exports= router