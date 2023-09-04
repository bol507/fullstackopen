const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('totalLikes', () => {
	it('should return 0 for an empty list of blog posts', () => {
		const blogPosts = []
		const likesTotal = listHelper.totalLikes(blogPosts)
		expect(likesTotal).toBe(0)
	})

	it('should return the correct total number of likes for a list of blog posts', () => {
		
		const likesTotal = listHelper.totalLikes(blogs)
		expect(likesTotal).toBe(36)
	})
})