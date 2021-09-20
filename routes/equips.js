const {Router} = require('express')
const router = Router()
const Equipment = require('../models/Equipment')



router.get('/',async(req,res)=>{
const equips = await Equipment.getAll()

    res.render('equipments',{
        title:'Equipments',
        isEquip: true,
        equips
    })
})

router.get('/:id',async(req,res)=>{
    const equip = await Equipment.getById(req.params.id)
    res.render('equip',{
        title: `${equip.title}`,
        equip,
        layout: 'empty'
    })
})


router.get('/edit/:id',async(req,res)=>{
    const equips = await Equipment.getAll()
    const equip = equips.find(c=> c.id.toString() === req.params.id.toString())
    res.render('edit-equip',{
        title: `Edit ${equip.title}`,
        equip
    })
})
router.post('/edit',async(req,res)=>{
  
    const equip =  req.body
    await Equipment.update(equip)
    res.redirect('/equip')
    
})



module.exports= router