import { useState, useContext } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext'
import {  BlogContext } from '../contexts/blogContext';

const BlogForm = ({ createBlog }) => {
  const {addBlog} = useContext(BlogContext)
  const notificationDispatch = useNotificationDispatch()

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBlog({ title, author, url }); 
      notificationDispatch({ type: 'SET_MESSAGE', message: 'Blog created successfully!' })
      createBlog() //call to toggle
    } catch (error) {
      notificationDispatch({ type: 'SET_MESSAGE', message: 'Error to create Blog!' })
    }
  };

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
