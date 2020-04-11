require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

// app.get('/', (req, res) => {
//     res.send('<h1>Hey there</h1>')
// })

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(result => {
            res.json(result.map(person => person.toJSON()))
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(result => {
            res.json(result.toJSON())
        })
    const id = parseInt(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'Content missing'
        })
    }

    // const existing = persons.find(person => person.name === body.name)

    // if(existing){
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person
        .save()
        .then(result => {
            res.json(result.toJSON())
        })
})

app.get('/api/info', (req, res) => {
    const maxId = persons.length
    res.send(`<div>   \
    Phonebook has info of ${maxId} people <br>
    ${new Date()}\
    </div>`)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})