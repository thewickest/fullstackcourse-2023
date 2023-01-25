const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

//DO NOT COMMIT THIS
const url =
  `mongodb+srv://graubuntu:${password}@cluster0.yttzt.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  //delete returnedObject._v
})

const Note = mongoose.model('Note', noteSchema)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId +1 
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if(!body.content) {
    response.status(400).json({error:'content missing'})
  }
  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date()
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/api/notes',(request,response) => {
  //response.json(notes)
  Note.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/notes/:id',(request,response) => {
  const id = Number(request.params.id)
  const note = notes.find(n => n.id === id)
  if(note) {
    response.json(note)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(n => n.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})