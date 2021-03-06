const express =require('express')
const app = express()
const path = require('path')
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./models/user')
const MongoStore = require('connect-mongodb-session')(session)
const MONGODB_URI = 'mongodb+srv://asad:b7q3JjGQzDpIfTfu@cluster0.l1arz.mongodb.net/buka'

// middlewares
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

// routes
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const equipRouter = require('./routes/equips')
const cardRouter =require('./routes/card')
const orderRouter = require('./routes/order')
const authRouter = require('./routes/auth')




const store = new MongoStore({
    collection: 'sessions-asad',
    uri:MONGODB_URI
})


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




app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret word',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/',homeRouter)
app.use('/add',addRouter)
app.use('/equip',equipRouter)
app.use('/card',cardRouter)
app.use('/order',orderRouter)
app.use('/auth',authRouter)













async function start(){
    try{

        await mongoose.connect(MONGODB_URI, async(err)=>{
            if(err) throw new Error(err)
             console.log('Connected to mangoDB');
           
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





