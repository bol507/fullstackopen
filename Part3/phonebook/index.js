const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())

const Person = require('./models/person')


morgan.token('fullstack',function (tokens, req, res) {
  let body = req.method === 'POST' ? JSON.stringify(req.body) : ' ';
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    body
  ].join(' ')
})

app.use(morgan('fullstack'))


app.get('/api/persons',(req,res) => {
    Person.find({}).then((persons) => {
      res.json(persons)
    })
})

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    const date = Date()
    res.send(
      `<p> Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
    )
  })
})

// Route to retrieve information about a person by their ID
app.get('/api/persons/:id', (req, res,next) => {
   // Find a person in the database based on the provided ID
  Person.findById(req.params.id)
  .then(person => {
    // If a person is found
    if (person) {
      // Send the person object as a JSON response
      res.json(person)
    } else {
      // If no person is found, set the response status to 404 (Not Found)
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

// Route to delete a person by their ID
app.delete('/api/persons/:id', (req, res,next) => {
   // Find a person in the database based on the provided ID and remove it
  Person.findByIdAndRemove(req.params.id)
    .then(deletedPerson => {
      // If a person is found and removed
      if (deletedPerson){
        console.log('deleted',deletedPerson.name)
         // Send the removed person object as a JSON response
        res.json(deletedPerson)
      }else{
        console.log('Cannot find the person with id',req.params.id)
        // If no person is found, set the response status to 404 (Not Found)
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      if(updatedPerson){
        console.log('person updated!')
        res.json(updatedPerson)
      }else {
        console.log(updatedPerson)
        res.status(404).end()
      }
      
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const newPerson = new Person( {
    name: body.name,
    number: body.number,
    //id: Math.floor(Math.random() * 999999)
  })

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if(!existingPerson){
        newPerson.save().then(savedPerson => { res.json(savedPerson)})
        .catch(error =>{
          console.log('oh no!',error)
          next(error)
        })
      }else{
        console.log('Person already exists')
        console.log('Found:', existingPerson)
        res.statusMessage = 'Person already exists'
        res.status(400).end()
      }
    })

})


const errorHandler = (error, request, response, next) => {
  
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}




app.use(express.static('build'))
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})