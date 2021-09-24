const {Schema, model} = require('mongoose')

// El Schema es una representación de la colección de la base de datos
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String
}) 
 
// transforma el documento que obtiene de mongo
userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        // le asignamos a id lo que viene en _id
        returnedObject.id = returnedObject._id
        // se eliminan estos dos
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

// con el schema creado, podemos crear un Modelo que use ese Schema que nos permitirá crear instancias para esa colección

const User = model('User', userSchema)

module.exports = User