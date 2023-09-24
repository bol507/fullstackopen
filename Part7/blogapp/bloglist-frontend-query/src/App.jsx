import { useState, useEffect, useRef, useContext } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import storageService from './services/storage';

import LoginForm from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { useNotificationDispatch } from './contexts/NotificationContext'

import { useBlogs,BlogContext } from './contexts/blogContext';

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const { updateBlog, deleteBlog} = useContext(BlogContext)
  const { blogs, isLoading } = useBlogs();
  const [user, setUser] = useState('');
  const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message,
      type,
    });

    setTimeout(() => {
      setInfo({ message: null });
    }, 3000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      notifyWith('welcome!');
    } catch (e) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    notifyWith('logged out');
  };

  const createBlog = () => {
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    try {
      await updateBlog(blog); 
      notificationDispatch({ type: 'SET_MESSAGE', message: `A like for the blog '${blog.title}' by '${blog.author}'` })
    }  catch (error) {
      notificationDispatch({ type: 'SET_MESSAGE', message: 'Error in likes' })
    }
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
     /* await blogService.remove(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
      setBlogs(blogs.filter((b) => b.id !== blog.id));*/
      try{
        await deleteBlog(blog.id); 
        notificationDispatch({ type: 'SET_MESSAGE', message: `The blog' ${blog.title}' by '${blog.author} removed` })
      }catch(error){
        notificationDispatch({ type: 'SET_MESSAGE', message: error})
      }
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
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