const {Schema, model} = require('mongoose') 

const itemSchema = new Schema({
    name: String,
    ilvl: Number
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

const Item = model('Item', itemSchema)

module.exports = Item