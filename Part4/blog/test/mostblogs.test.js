const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('mostBlogs', () => {
	it('should return null for an empty list of blogs', () => {
		const blogList = []
		const result = listHelper.mostBlogs(blogList)
		expect(result).toBeNull()
	})

	it('should return the author with the most blogs and the count', () => {

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
	})

	it('should return the author with the most blogs if there are multiple authors with the same maximum number of blogs', () => {

		const result = listHelper.mostBlogs(blogs)
		expect(result).toMatchObject({ author: 'Robert C. Martin', blogs: 3 })
	})
})