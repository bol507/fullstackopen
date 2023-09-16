import { useState, useEffect, useRef } from 'react'

import './style.css'


import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => {
        const sortedBlogs = blogs.sort(compareByLikes)
        setBlogs(sortedBlogs)
      })
  }, [])

  /**
   * save user and token in local storage
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const compareByLikes = (a, b) => {
    return b.likes - a.likes;
  }

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


  const handleCreateBlog = async (blogObjet) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.setToken(user.token)
      const createdBlog = await blogService.create(blogObjet)
      setBlogs([...blogs, createdBlog])
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

  const handleUpdateBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.update(blogObject)
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.map((blog) =>
          blog.id === blogObject.id ? blogObject : blog
        );
        return updatedBlogs;
      });
      setMessage('Blog updated')
      setType('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    } catch (error) {
      setMessage(error.message)
      setType('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleDeleteBlog = async(blogId) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogId);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      setMessage('Blog deleted');
      setType('success');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage(error.message);
      setType('error');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
      <Navbar
        handleLogout={handleLogout}
        handleSectionCreateBlog={handleSectionCreateBlog}
        handleSectionHome={handleSectionHome}
      />
      <Notification message={message} type={type} />

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm CreateBlog={handleCreateBlog} />
      </Togglable>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            UpdateBlog={handleUpdateBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        )
      }

    </div>


  )
}

export default App