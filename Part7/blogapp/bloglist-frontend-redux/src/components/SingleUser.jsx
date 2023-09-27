import React from 'react';

const SingleUser = ({user,blogs}) => {
    const userBlogs = blogs.filter(blog => blog.user.id === user.id);
    return (
      <div className="my-4">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <h3 className="text-lg font-bold mb-2">Added blogs</h3>
      {userBlogs.map((blog) => (
        <ul key={blog.id} className="list-disc ml-6">
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
    )
}

export default SingleUser