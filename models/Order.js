const {model, Schema} = require('mongoose')



const orderSchema = new Schema({
    equips:[
        {
            equip:{
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    user:{
        name: String,
        email:String,
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = model('Order', orderSchema)