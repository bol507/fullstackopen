
import React from 'react';
import { Link } from 'react-router-dom'


const Users = ({ users, userBlogCounts }) => {
  return (
    <div>
       <h2>Users</h2>
      <h3>Blogs created</h3>
      {users.map((user) => (
      <div key={user.id}>
        <Link to={`/users/${user.id}`}>
          <span>{user.name}</span>
        </Link>
        <span>{userBlogCounts[user.username] || 0}</span>
      </div>
    ))}
    </div>
    
  )
};

export default Users;