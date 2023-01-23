const express = require('express')
const app = express()

app.use(express.json())
let people = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.header({'Content-Type':'text/html'})
  response.write(`<p>Phonebook has info for ${people.length} people</p>`)
  response.write(`<p>${new Date()}</p>`)
  response.end()
})

app.get('/api/persons', (request, response) => {
  response.json(people)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(p => p.id === id)
  if(!person) {
    response.status(404).end()
  }else {
    response.json(person)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(p => p.id !== id)
  response.end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})