import React from "react";
import { useState } from 'react';

const SingleBlog = ({blog, like, comment}) =>{
    const [userComment, setUserComment] = useState('');
    console.log(blog.comments)
    const handleLike = (event)=>{
        event.preventDefault();
        like(blog)
    }

    const handleComment = (event) =>{
        event.preventDefault();
        comment(blog.id, userComment)
        setUserComment("");
    }
    return(
        <div className="my-4">
  <h2 className="text-2xl font-bold mb-2">{blog.title} {blog.author}</h2>
  <div className="mb-2">
    <a href={blog.url} className="text-blue-500">{blog.url}</a>
  </div>
  <div className="flex items-center mb-2">
    <span className="mr-2">likes {blog.likes}</span>
    <button onClick={handleLike} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
      Like
    </button>
  </div>
  <div className="mb-2">
    added by {blog.user.name}
  </div>
  <h2 className="text-xl font-bold mb-2">Comments</h2>
  <form onSubmit={handleComment} className="mb-2">
    <input
      value={userComment}
      onChange={({ target }) => setUserComment(target.value)}
      id="comment"
      className="px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
      Add Comment
    </button>
  </form>
  <ul>
    {blog.comments.map((comment) => (
      <li key={comment.id} className="mb-1">{comment.content}</li>
    ))}
  </ul>
</div>
    )
}//SingleBlog

export default SingleBlog