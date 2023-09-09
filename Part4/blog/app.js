const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//controllers
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
//utils
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error: ', error)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor,  blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app