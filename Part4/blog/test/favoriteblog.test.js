const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('favoriteBlog', () => {
	it('should return null for an empty list of blogs', () => {
		const blogList = []
		const favorite = listHelper.favoriteBlog(blogList)
		expect(favorite).toBeNull()
	})

	it('should return the blog with the most likes from a list of blogs', () => {
		
		const favorite = listHelper.favoriteBlog(blogs)
		
		expect(favorite).toEqual({ title: 'Canonical string reduction', author:  'Edsger W. Dijkstra', likes: 12 })
	})

	it('should return one of the blogs with the most likes if there are multiple with the same maximum likes', () => {
		
		const favorite = listHelper.favoriteBlog(blogs)
		expect(favorite).toMatchObject({ likes: 12 })
	})
})