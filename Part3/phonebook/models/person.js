//import mongoose
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) =>{
        console.log("Error:", error)
    })

//create schema
const personSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:true
    },
    number: {
        type: String,
        default:"no number"
    }
})



personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    },
  })


//create model nameModel nameSchema
module.exports = mongoose.model('Person', personSchema)