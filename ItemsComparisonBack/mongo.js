const mongoose = require('mongoose') 
const connectionString = process.env.MONGO_DB_URI

// connect devuelve un promise 
mongoose.connect(connectionString, {
    // con esto quitamos unos warnings de features deprecadas //
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>{
        console.log('Databased connected')
    }).catch(err => {
        console.log(err)
    })
 