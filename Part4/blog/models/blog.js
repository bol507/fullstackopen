const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error: ', error)
	})

const blogSchema = new mongoose.Schema({
	title: {
		type: String},
	author: {
		type: String},
	url: {
		type: String},
	likes: {
		type: Number},
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model('Blog', blogSchema)