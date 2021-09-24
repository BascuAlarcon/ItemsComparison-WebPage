/* eslint-disable no-unused-vars */
require('dotenv').config()      // usar el archivo .env
require('./mongo.js')

// MODELS // 
const User = require('./models/User')
const Item = require('./models/Item')

const express = require('express')
const cors = require('cors')
  
const bodyParser = require('body-parser')
const app = express()
const logger = require('./loggerMiddleware')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const { parse } = require('dotenv')
 
app.use(cors())
app.use(express.json()) // modulo para parsear las request
app.use(logger)         // MIDDLEWARE     
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// PETICIONES A USERS //

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/users', (request, response, next) => {
    User.find({}).then(users =>{
        response.json(users)
    }).catch(error=>next(error))
})
 
app.get('/api/users/:id', (request, response, next) => {
    const {id} = request.params 
    User.findById(id).then(user => {
        if (user){
            response.json(user)
        }else{
            response.status(404).end()
        }
    }).catch(err => {
        next(err) 
    })
}) 

app.put('/api/users/:id', (request, response, next) => {
    const {id} = request.params 
    const user = request.body
    const newUserData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender
    }
    User.findByIdAndUpdate(id, newUserData, {new: true})
        .then(result => {
            response.json(result)
        }) 
})

app.delete('/api/users/:id', (request, response, next) => {
    const {id} = request.params 
    User.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error)) 
    response.status(204).end()
})

app.post('/api/users', (request, response) => {
    const user = request.body

    /* if(!user.content){
        return response.status(404).json({
            error: 'user.content is missing'
        })
    } */

    const newUser = User({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender
    })
    newUser.save().then(savedUser => {
        response.json(savedUser)
    }) 
})

// PETICIONES A ITEMS //

app.get('/api/items', (request, response, next) => {
    Item.find({}).then(users => {
        response.json(users)
    }).catch(error => next(error))
})

app.get('/api/items/:id', (request, response, next) =>{
    const {id} = request.params
    Item.findById(id).then(item => {
        if(item){
            response.json(item)
        }else{
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.post('/api/items', (request, response) => {
    const item = request.body
    /* if(!item.content){
        return response.status(404).json({
            error: 'item.content is missing'
        })
    } */
    const newItem = Item({
        name: item.name,
        ilvl: item.ilvl
    })
    newItem.save().then(savedItem => {
        response.json(savedItem)
    })
})

app.put('/api/items/:id', (request, response, next) => {
    const {id} = request.params
    const item = request.body
    const newItem = {
        name: item.name,
        ilvl: item.ilvl
    }
    Item.findByIdAndUpdate(id, newItem, {new: true})
        .then(result => {
            response.json(result)
        })
})

app.delete('/api/items/:id', (request, response, next) => {
    const {id} = request.params
    Item.findByIdAndDelete(id).then(() => {
        response.status(200).end()
    }).catch(err => next(err))
    response.status(204).end()
})

// Handle Errors

app.use(notFound) 
app.use(handleErrors)

// Run Server //

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})    
 