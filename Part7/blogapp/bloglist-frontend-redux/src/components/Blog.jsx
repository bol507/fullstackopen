import { useState } from 'react';
import { Link } from 'react-router-dom'

const Blog = ({ blog, like, canRemove, remove }) => {
  const [visible, setVisible] = useState(false);


  return (
    <div  className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      
    </div>
  );
};


export default Blog;
