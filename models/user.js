const {model,Schema} = require('mongoose')


 const userSchema = new Schema({
     email: {
         type: String,
         required: true
     },
     name: {
         type: String,
         required: true
     },
     password:{
         type: String,
         required: true
     },
     cart:{
         items:[
             {
                 count: {
                     type: Number,
                     required:true,
                     default: 1
                 },
                 equipId: {
                     type: Schema.Types.ObjectId,
                     required: true,
                     ref: 'Equipment'
                 }
             }
         ]
     }

 })

 
 userSchema.methods.addToCart =  function(equip){
     const items = this.cart.items.concat()
     const idx = items.findIndex(c=> c.equipId.toString() === equip._id.toString())
     const candidate = items[idx]

     if(candidate){
        candidate.count++
        items[idx] = candidate
     }else{
        items.push({
            count: 1,
            equipId: equip._id
        }) 

     }

     this.cart = {items}
     return this.save()

 }

 userSchema.methods.removeFromCart = function(id){
     let items = this.cart.items.concat()
     const idx = items.findIndex(c=> c.equipId.toString() === id.toString())
     const candidate = items[idx]
     if(items[idx].count == 1){
        items = items.filter(c=> c.equipId.toString() !== id.toString())
     }
     else{
        items[idx].count--
     }

     this.cart = {items}
     return this.save()

 }

 userSchema.methods.clearCart = function(){
    this.cart  = {items:[]} 
    return this.save()
 }


 module.exports = model('User', userSchema)