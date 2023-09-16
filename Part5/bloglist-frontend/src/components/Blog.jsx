import Togglable from "./Togglable"

const Blog = ({ blog,UpdateBlog,handleDeleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    marginLeft:5,
    marginRight:5,
    backgroundColor: '#ffffff',
  }
  const handleLike = () => {
    UpdateBlog({ ...blog, likes: blog.likes + 1 }) 
  }
  const handleDelete = () => {
    
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      handleDeleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLike}>like</button></p>
      </Togglable>
      {blog.author}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )

}

export default Blog