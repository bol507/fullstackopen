const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body
		const saltRounds = 10
		const password = body.password

		if (password.length < 3) {
			return response.status(400).json({
				error: 'Password must be at least 3 characters long'
			})
		}

		const passwordHash = await bcrypt.hash(password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser)
	} catch (error) {
		next(error)
	}
})

usersRouter.get('/', async (request, response, next) => {
	try {
		const users = await User.find({}).populate('blogs')
		response.json(users)
	} catch (error) {
		next(error)
	}

})

module.exports = usersRouter