const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
    {
        name: "Arto Hellas",
        number: "+50766972558",
        id: 1
    },
    {
       name: "Ada Lovelace",
       number: "39-44-5323523",
       id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
]

app.use(express.json())

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

app.get('/', (req, res) => {
  res.send('<h1>Welcome to part3</h1>')
})

app.get('/api/persons',(req,res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const numPersons = persons.length

  res.send(`<p>Phonebook has info for ${numPersons} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 999999)
  }

  const personExists = persons.find(p => p.name === body.name)
  if (personExists){
    return res.status(400).json({ error: 'name exists' })
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})