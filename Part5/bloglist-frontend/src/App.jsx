import { useState, useEffect } from 'react'

import './style.css'


import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import CreateBlog from './components/CreateBlog'
import Home from './components/Home'

import loginService from './services/login'
import blogService from './services/blogs'


import Notification from './components/Notification'

const App = () => {
  const [currentSection, setCurrentSection] = useState(null)
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

  const handleSectionCreateBlog = () => {
    setCurrentSection('create-blog');
  }

  const handleSectionHome = () => {
    setCurrentSection(null);
  }


  const handleCreateBlog = async (title, author, url) => {

    try {
      const blogObjet = {
        title,
        author,
        url
      }
      blogService.setToken(user.token)
      const createdBlog = await blogService.create(blogObjet)
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

  let content = <div></div>;
  if (currentSection === null) {
    content = <Home blogs={blogs} />
  } else if (currentSection === 'create-blog') {
    content = <CreateBlog handleCreateBlog={handleCreateBlog} />;
  }

  return (
    <div>
      <Navbar
        handleLogout={handleLogout}
        handleSectionCreateBlog={handleSectionCreateBlog}
        handleSectionHome={handleSectionHome}
      />
      <Notification message={message} type={type} />
      {content}
    </div>


  )
}

export default App