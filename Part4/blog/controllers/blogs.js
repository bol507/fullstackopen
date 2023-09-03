const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		if(blogs.length === 0){
			response.json('Empty')
		}else{
			response.json(blogs)
		}			
	})
})

blogsRouter.post('/', (request, response) => {
	console.log(request.body)
	const blog = new Blog(request.body)

	blog.save().then((result) => {
		response.status(201).json({
			_id: result._id,
			title: result.title,
			author: result.author,
			url: result.url,
			likes: result.likes
		})
	})
})

module.exports = blogsRouter