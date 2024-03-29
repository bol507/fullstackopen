import React from "react"
import Blog from './Blog'

const Home = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Home