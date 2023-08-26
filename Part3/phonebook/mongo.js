//import mongoose
const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.5vgknff.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url).catch((error) =>{
    console.log("Error:", error)
    mongoose.connection.close()
    process.exit(1)
})

//create schema
const personSchema = new mongoose.Schema({
  name: {type: String, required:true},
  number: {type: String, default:"no number"}
})

//create model nameModel nameSchema
const Person = mongoose.model('Person', personSchema)

//check name and number
if (name && number){
    const person = new Person({
        name: name,
        number: number,
        
    })

    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
    .catch((error) => {
        console.log('Error: ', error)
        mongoose.connection.close()
        process.exit(1)
    })
} else {
    Person.find({})
      .then((result) => {
        console.log("phonebook")
        result.forEach((e) => {
          console.log("Name:", e.name, "- Number:", e.number)
        })
        mongoose.connection.close()
      })
      .catch((error) => {
        console.log("Error:", error)
        mongoose.connection.close()
        process.exit(1)
      })
  }



