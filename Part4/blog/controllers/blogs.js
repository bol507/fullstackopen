const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	try {
		const blogs = await Blog.find({})
		if (blogs.length === 0) {
			response.json('Empty')
		} else {
			response.json(blogs)
		}
	} catch (error) {
		response.status(500).json({ error: error.message })
	}
})

blogsRouter.post('/', async (request, response) => {
	try {
		const { title, author, url, likes } = request.body

		if (!title || !url) {
			return response.status(400).json({ error: 'Title and URL are required' })
		}

		const blog = new Blog({
			title,
			author,
			url,
			likes: likes || 0,
		})

		const result = await blog.save()
		response.status(201).json({
			_id: result._id,
			title: result.title,
			author: result.author,
			url: result.url,
			likes: result.likes,
		})
	} catch (error) {
		response.status(500).json({ error: error.message })
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const blog = await Blog.findByIdAndRemove(request.params.id)
		if (!blog) {
			return response.status(404).json({ error: 'Blog not found' });
		}
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

blogsRouter.get('/:id', async (request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id)
		if (blog) {
			response.json(blog)
		} else {
			response.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const { title, author, url, likes } = request.body

		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			{ title, author, url, likes },
			{ new: true }
		)

		if (!updatedBlog) {
			return response.status(404).json({ error: 'Blog not found' })
		}

		response.status(200).json(updatedBlog)
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id/likes', async (request, response,next) => {
	try {
		const { likes } = request.body

		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			{ likes },
			{ new: true }
		)

		if (!updatedBlog) {
			return response.status(404).json({ error: 'Blog not found' })
		}

		response.status(200).json(updatedBlog)
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter