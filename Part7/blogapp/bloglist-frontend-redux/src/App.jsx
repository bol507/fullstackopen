import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Link, useMatch } from 'react-router-dom'

import Blogs from './components/Blogs';
import LoginForm from './components/Login';
import SingleBlog from './components/SingleBlog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import SingleUser from './components/SingleUser'
import Users from './components/Users'

import { initializeBlogs, updateBlog, deleteBlog, addComment } from './reducers/blogReducer';
import { showNotification } from './reducers/notificationReducer'
import { initializeUser, loginUser, removeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector( (state) => {
    const array = state.blogs;
    const sorted = [...array].sort((a, b) => {
      return b.likes - a.likes
    });
    return sorted;
  });
  const user = useSelector(state => state.user) //use for login
  const users = useSelector(state => state.users)
  const blogFormRef = useRef();
 
  useEffect(() => { 
    dispatch(initializeUser())  
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [dispatch]) 

  useEffect(() => { 
    dispatch(initializeUsers())  
  }, []);

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
  };//remove

  const comment = (blogid, comment) => {
    dispatch(addComment(blogid,comment))
    dispatch(showNotification(`A comments is registered`, 5,'success'))
  }

  const userBlogCounts = blogs.reduce((counts, blog) => {
    const username = blog.user.username;
    counts[username] = (counts[username] || 0) + 1;
    return counts;
  }, {});

  const match = useMatch('/users/:id')
  const userId = match?.params?.id;
  const userById = userId ? users.find(user => user.id === userId) : null;

  const matchB = useMatch('/blogs/:id')
  const blogId = matchB?.params?.id;
  const blogById = blogId ? blogs.find(blog => blog.id === blogId) : null;

  const Menu = () => {
    const padding = 'px-5'; // Clase de Tailwind CSS para el relleno horizontal
  
    return (
      <div className="flex justify-center bg-gray-200 py-4">
        <Link className={`text-gray-700 ${padding}`} to="/">Blogs</Link>
        <Link className={`text-gray-700 ${padding}`} to="/users">Users</Link>
      </div>
    );
  };
  

  if (!user || user.length === 0) {
    return (
      <div>
        <h2>log in to application</h2>
        
        <LoginForm login={login} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
  <Menu />

  <div className="flex items-center text-gray-700 my-4">
    {user.name} logged in
    <button
      onClick={logout}
      className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
    >
      Logout
    </button>
  </div>

  <Routes>
    <Route path="/users/:id" element={<SingleUser user={userById} blogs={blogs} />} />
    <Route path="/users" element={<Users users={users} userBlogCounts={userBlogCounts} />} />
    <Route path="/" element={<Blogs user={user} blogs={blogs} />} />
    <Route path="/blogs/:id" element={<SingleBlog blog={blogById} like={like} comment={comment} />} />
  </Routes>
</div>
  );
};

export default App;
