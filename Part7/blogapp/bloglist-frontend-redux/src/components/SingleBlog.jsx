import React from "react";

const SingleBlog = ({blog, like}) =>{
    
    const handleLike = (event)=>{
        event.preventDefault();
        like(blog)
    }
    return(
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <div>
                <a href={blog.url}> {blog.url}</a>
            </div>
            <div>
                likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>
            added by {blog.user.name}
          </div>
        </div>
    )
}//SingleBlog

export default SingleBlog