import React, { useEffect, useState } from 'react'
import Togglable from './Togglable'
import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, UpdateBlog, handleDeleteBlog,user }) => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await blogService.getUserId(user)
        setUserId(id)
      } catch (error) {
        console.error('Error fetching user ID:', error)
        setUserId(null)
      }
    }
    fetchUserId()
  }, [user])
  const handleLike = () => {
    UpdateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <p className="title">{blog.title}</p>
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLike} className='like-button'>like</button></p>
      </Togglable>
      <p className="author">{blog.author}</p> 
      {userId === blog.user.id && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default Blog