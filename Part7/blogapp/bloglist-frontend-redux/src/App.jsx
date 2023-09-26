import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog';
import LoginForm from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer';
import { showNotification } from './reducers/notificationReducer'
import { initializeUser, loginUser, removeUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector( (state) => {
    const array = state.blogs;
    const sorted = [...array].sort((a, b) => {
      return b.likes - a.likes
    });
    return sorted;
  });
  const user = useSelector(state => state.user)

  //const [user, setUser] = useState('');
  const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();
  
  useEffect(() => { 
    dispatch(initializeUser())  
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [dispatch]) 

  const login = async (username, password) => {
    try {
      dispatch(loginUser({ username, password }))
      dispatch(showNotification('Welcome!', 5,'success'))
    } catch (error) {
      dispatch(showNotification(error, 5,'error'))
    }
  };

  const logout = async () => {
    dispatch(removeUser())
    dispatch(showNotification('Logged out', 5,'success'))
  };

  const createBlog = ()=> {
    blogFormRef.current.toggleVisibility();
  }//createBlog

  const like = (blog) => {
    dispatch(updateBlog(blog))
    dispatch(showNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, 5,'success'))
  }//like

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(deleteBlog(blog.id))
      dispatch(showNotification(`The blog' ${blog.title}' by '${blog.author} removed`,5,'success'))
    }
  };

  if (!user || user.length === 0) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
