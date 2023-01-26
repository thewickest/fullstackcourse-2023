require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const note = require('./models/note')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.post('/api/notes', (request, response) => {
  const body = request.body

  if(!body.content) {
    response.status(400).json({error:'content missing'})
  }
  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes',(request,response) => {
  Note.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/notes/:id',(request,response, next) => {
  Note.findById(request.params.id)
    .then(note=> {
      if(note) {
        response.json(note)
      }else {
        response.status(404).end( )
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
  Note.deleteOne({id: request.params.id}).then(deletedNote => {
    response.json(deletedNote)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)