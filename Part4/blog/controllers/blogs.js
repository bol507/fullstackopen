const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


/*const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}
*/

blogsRouter.get('/', async (request, response) => {
	try {
		const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
		console.log(blogs)
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

		const user = request.user

		const blog = new Blog({
			title,
			author,
			url,
			likes: likes || 0,
			user: user._id,
		})

		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		response.status(201).json({
			_id: savedBlog._id,
			title: savedBlog.title,
			author: savedBlog.author,
			url: savedBlog.url,
			likes: savedBlog.likes,
			user: user._id
		})
	} catch (error) {
		response.status(500).json({ error: error.message })
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const blogId = request.params.id
		

		const blog = await Blog.findById(blogId)
		if (!blog) {
			return response.status(404).json({ error: 'Blog not found' })
		}
		
		const user = request.user

		if (blog.user.toString() !== user._id.toString()) {
			return response.status(403).json({ error: 'Forbidden' })
		}

		await Blog.findByIdAndRemove(blogId)
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

blogsRouter.put('/:id/likes', async (request, response, next) => {
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