import React from 'react';

const SingleUser = ({user,blogs}) => {
    const userBlogs = blogs.filter(blog => blog.user.id === user.id);

    console.log('singleuser',userBlogs)
    return (
       <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        {userBlogs.map(blog => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
         
        </ul>
      ))}

       </div>
    )
}

export default SingleUser