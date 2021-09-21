const express =require('express')
const app = express()
const path = require('path')
const exhbs = require('express-handlebars')
const User = require('./models/user')
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const equipRouter = require('./routes/equips')
const cardRouter =require('./routes/card')
const mongoose = require('mongoose')



const hbs = exhbs.create({
    defaultLayout:'main',
    extname: 'hbs',
    partialsDir: 'views/partials',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoByDefault: true
    }
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'views'))

app.use(async(req,res,next)=>{
  try{ 
    const user =await User.findById('6149c5745aa00ef5db64e008')
    req.user = user
    next()
}
   catch(e){
       console.log(e);
   }
})

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))

app.use('/',homeRouter)
app.use('/add',addRouter)
app.use('/equip',equipRouter)
app.use('/card',cardRouter)













async function start(){
    try{

        const MONGODB_URI = 'mongodb+srv://asad:b7q3JjGQzDpIfTfu@cluster0.l1arz.mongodb.net/buka'
        await mongoose.connect(MONGODB_URI, async(err)=>{
            if(err) throw new Error(err)
             console.log('Connected to mangoDB');
             const candidate = await User.findOne()
             if(!candidate){
                 const user = new User({
                     email: 'asad@mail.ru',
                     name: 'Asadbek',
                     cart: {items:[]}
                 })
                 await user.save()
             }
            const PORT = process.env.PORT || 3300
            app.listen(PORT,()=>{
                console.log(`Express is running on ${PORT}`);
            })
            
        })
    }
    catch(e){
        console.log(e);
    }
}

start()





