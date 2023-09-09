const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogs = require('./blogs') //initial blogs

describe('when there is initially some blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(blogs)
	})

	test('returns the correct number of blog posts in JSON format', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(blogs.length)

	}, 2000)

	test('should have an "id" property instead of "_id"', async () => {
		const response = await api.get('/api/blogs')

		const blogPosts = response.body

		blogPosts.forEach((post) => {
			expect(post.id).toBeDefined()
			expect(post._id).toBeUndefined()
		})

	}, 2000)


})

describe('Create new blog post', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
	})

	test('should create a new blog post', async () => {
		const newBlog = {
			title: 'Microservices Architecture',
			author: 'Amburi Roy',
			url: 'https://dev.to/amburi/microservices-architecture-3b98',
			likes: 2,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogs = await Blog.find({})
		expect(blogs.length).toBe(1)

		const savedBlog = blogs[0]
		expect(savedBlog.title).toBe(newBlog.title)
		expect(savedBlog.author).toBe(newBlog.author)
		expect(savedBlog.url).toBe(newBlog.url)
		expect(savedBlog.likes).toBe(newBlog.likes)
	}, 2000)

	test('should set likes to 0 if missing in the request', async () => {
		const newBlog = {
			title: 'Microservices Architecture',
			author: 'Amburi Roy',
			url: 'https://dev.to/amburi/microservices-architecture-3b98',

		}

		const response = await api.post('/api/blogs').send(newBlog)
		expect(response.status).toBe(201)
		expect(response.headers['content-type'])
			.toMatch(/application\/json/)

		const createdBlog = response.body

		expect(createdBlog.likes).toBeDefined()
		expect(createdBlog.likes).toBe(0)
	}, 2000)

	test('should respond with 400 Bad Request if title and url are missing', async () => {
		const newBlog = {
			author: 'Amburi Roy',
			likes: 10,
		}

		const response = await api.post('/api/blogs').send(newBlog)

		expect(response.status).toBe(400)
		expect(response.headers['content-type'])
			.toMatch(/application\/json/)

		const responseBody = response.body

		expect(responseBody.error).toBe('Title and URL are required')
	}, 2000)

})

describe('Delete a blog', () => {
	let savedBlog

	beforeEach(async () => {
		await Blog.deleteMany({})

		const newBlog = new Blog({
			title: 'Test Blog',
			author: 'John Doe',
			url: 'https://example.com',
			likes: 10,
		})

		savedBlog = await newBlog.save()
	})

	test('should delete a blog', async () => {
		const response = await api.delete(`/api/blogs/${savedBlog._id}`).expect(204)

		expect(response.status).toBe(204)

		const deletedBlog = await Blog.findById(savedBlog._id)
		expect(deletedBlog).toBeNull()
	})

	test('should return 404 if blog not found', async () => {
		const nonExistingId = '60e9b4a2c2e7b12f40e8f5f0'
		await api.delete(`/api/blogs/${nonExistingId}`).expect(404)
	})


})


describe('Update a blog', () => {
	let savedBlog
	beforeEach(async () => {
		await Blog.deleteMany({})

		const newBlog = new Blog({
			title: 'Test Blog',
			author: 'John Doe',
			url: 'https://example.com',
			likes: 10,
		})

		savedBlog = await newBlog.save()
	})

	test('should update a blog by its ID', async () => {
		const updatedData = {
			title: 'Updated Blog',
			author: 'Jane Smith',
			url: 'https://example.com/updated',
		}

		const response = await api
			.put(`/api/blogs/${savedBlog._id}`)
			.send(updatedData)
			.expect(200)

		expect(response.status).toBe(200)
		expect(response.body.title).toBe(updatedData.title)
		expect(response.body.author).toBe(updatedData.author)
		expect(response.body.url).toBe(updatedData.url)
		expect(response.body.likes).toBe(savedBlog.likes)
	},2000)

	test('should update the likes of a blog', async () => {
		const updatedLikes = {
			likes: 20,
		}

		const response = await api
			.put(`/api/blogs/${savedBlog._id}/likes`)
			.send(updatedLikes)
			.expect(200)

		expect(response.status).toBe(200)
		expect(response.body.likes).toBe(updatedLikes.likes)
	},2000)

})
afterAll(() => {
	mongoose.connection.close()
})
