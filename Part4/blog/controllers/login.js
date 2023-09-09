const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		// find user to database
		const user = await User.findOne({ username: body.username })

		// check exists user and correct password
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash)

		// user or pass is invalid send estatus 401 and error
		if (!(user && passwordCorrect)) {
			return response.status(401).json({
				error: 'invalid username or password'
			})
		}

		// create object userForToken 
		const userForToken = {
			username: user.username,
			id: user._id,
		}


		// token expires in 60*60 seconds, that is, in one hour
		const token = jwt.sign(
			userForToken,
			process.env.SECRET,
			{ expiresIn: 60 * 60 }
		)

		// send token and information of user
		response
			.status(200)
			.send({ token, username: user.username, name: user.name })
	} catch (error) {
		next(error)
	}
})

module.exports = loginRouter