//import mongoose
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error:', error)
  })

//create schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name must be at least 3 characters long'],
    unique: true,
    uniqueCaseInsensitive: true
  },
  number: {
    type: String,
    default: 'no number',
    minLength: [8, 'Number must be at least 8 digits long'],
  }
})




// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})


//create model nameModel nameSchema
module.exports = mongoose.model('Person', personSchema)