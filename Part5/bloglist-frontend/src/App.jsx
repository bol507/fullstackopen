import { useState, useEffect } from 'react'

import './style.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'

import loginService from './services/login'
import blogService from './services/blogs'


import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const response = await loginService.login({ username, password })

      blogService.setToken(response.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(response)
      )

      setUser(response)

    } catch (error) {
      setMessage(error.message)
      setType('error')
      console.log(error)
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  }

  const addBlog = async (title,author,url,event) => {
    event.preventDefault()
    try {
      const payload = {
        user: user,
        title,
        author,
        url
      }
      blogService.setToken(user.token)
      const createdBlog = blogService.create(payload)
      setBlogs([...blogs, createdBlog])
      setTitle('');
      setAuthor('');
      setUrl('');
      setMessage('Blog created')
      setType('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setMessage(error.message)
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} type={type} />
        <LoginForm handleLogin={handleLogin} />
      </div>

    )

  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>


  )
}

export default App