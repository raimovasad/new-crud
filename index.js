const express =require('express')
const app = express()
const path = require('path')
const exhbs = require('express-handlebars')

const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const equipRouter = require('./routes/equips')
const cardRouter =require('./routes/card')


const hbs = exhbs.create({
    defaultLayout:'main',
    extname: 'hbs',
    partialsDir: 'views/partials'
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))

app.use('/',homeRouter)
app.use('/add',addRouter)
app.use('/equip',equipRouter)
app.use('/card',cardRouter)



















const PORT = process.env.PORT || 3300
app.listen(PORT,()=>{
    console.log(`Express is running on ${PORT}`);
})