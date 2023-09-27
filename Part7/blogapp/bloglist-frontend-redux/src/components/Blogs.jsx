import React from 'react';

import Blog from './Blog'

const Blogs = ({blogs ,user}) => {
    return(
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
    )//return
}//Blogs

export default Blogs