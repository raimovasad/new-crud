const {Router} = require('express')
const router= Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


router.get('/login',async(req,res)=>{
    res.render('auth/login',{
        title: 'Authentication',
        isLogin: true
    })
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body

    try{
        const candidate = await User.findOne({email})
        if(candidate){
            const areSame = await bcrypt.compare(password,candidate.password)
            if(!areSame){
                res.redirect('/auth/login#login')
            }
            else{
                req.session.user = candidate
                req.session.isAuthenticated = true
              await   req.session.save(err=>{
                    if(err) throw new Error(err)
                    else res.redirect('/')
                })
            }
 
        } 
        else{
            res.redirect('/auth/login#login')
           
        }
    }
    catch(e){
        console.log(e);
    }
   
    
})

router.post('/register',async(req,res)=>{
    try{
        const {name, email,password,confirm} = req.body

        const candidate = await User.findOne({email})
        if(candidate){
            res.redirect('/auth/login#register')
        }
        else{
         const areSame = password === confirm
         if(areSame){
             const hash = await bcrypt.hash(password,12)
            const user = new User({
                name, email,password:hash, cart: {items:[]}
            })
            await user.save()
            res.redirect('/auth/login#login')
         }
        }
    }
    catch(e){
        console.log(e);
    }
})

router.get('/logout',(req,res)=>{
    try{
        req.session.destroy((err)=>{
            if(err) throw new Error(err)
            res.redirect('/auth/login#login')
        })
    }
    catch(e){
        console.log(e);
    }

})

module.exports = router