const dummy = (blogs) => {
	return 1
}

/**
 * Calculates the total number of likes in a list of blog posts.
 * @param {Array} blogPosts - The list of blog posts.
 * @returns {number} - The total number of likes.
 */
const totalLikes = (blogs) => {
	const likesTotal = blogs.reduce((total, blog) => {
		return total + blog.likes
	}, 0)

	return likesTotal
}



/**
 * Finds the blog with the most likes from a list of blogs.
 * If multiple blogs have the same maximum number of likes, one of them is returned.
 * @param {Array} blogs - The list of blogs.
 * @returns {Object|null} - The blog with the most likes, or null if the list is empty.
 */
function favoriteBlog(blogs) {
	if (blogs.length === 0) {
		return null //return null is empty
	}

	//found blog with more likes
	const favorite = blogs.reduce((max, blog) => {
		return blog.likes > max.likes ? blog : max
	})

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}


/**
 * Finds the author with the most blogs from a list of blogs.
 * The return value includes the author's name and the count of their blogs.
 * @param {Array} blogs - The list of blogs.
 * @returns {Object|null} - An object containing the author with the most blogs and the count,
 * or null if the list is empty.
 */
function mostBlogs(blogs) {
	if (blogs.length === 0) {
		return null
	}

	const blogsByAuthor = {}
	let maxAuthor = ''
	let maxCount = 0

	blogs.forEach((blog) => {
		const author = blog.author
		if (!blogsByAuthor[author]) {
			blogsByAuthor[author] = 1
		} else {
			blogsByAuthor[author]++
		}

		if (blogsByAuthor[author] > maxCount) {
			maxAuthor = author
			maxCount = blogsByAuthor[author]
		}
	});

	return { author: maxAuthor, blogs: maxCount }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}
