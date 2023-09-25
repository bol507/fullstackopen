import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
   // await createBlog({ title, author, url });
    dispatch(addBlog({title,author,url}))
    dispatch(showNotification(`A new blog '${title}' by '${author}' added`, 5,'success'))
    createBlog();
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
