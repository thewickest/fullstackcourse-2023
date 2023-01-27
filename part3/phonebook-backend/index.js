require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./model/person')
const { response } = require('express')
const app = express()

morgan.token('data',(req,res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const nameExists = (name) => {
  return people.find(p => p.name === name)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({error:'name or number missing'})
  }else if(nameExists(body.name)){
    return response.status(400).json({error:'name must be unique'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {
  response.header({'Content-Type':'text/html'})
  response.write(`<p>Phonebook has info for ${people.length} people</p>`)
  response.write(`<p>${new Date()}</p>`)
  response.end()
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

//Handler of Unknown Endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)


//Error Handler
const errorHandler = (error, request, response, next) => {
  console.log(error);
  if(error.name === 'CastError') {
    response.status(400).send({error: 'malformated id'})
  }
  next(error)
}

app.use(errorHandler)