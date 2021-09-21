const {model, Schema} = require('mongoose')


const equipSchema = new Schema({
    
    title:{
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

module.exports = model('Equipment',equipSchema)