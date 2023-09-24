import axios from 'axios';
import storageService from './services/storage';

const baseUrl = 'http://localhost:3003/api';
const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

export const getAll = () =>
  axios.get(`${baseUrl}/blogs`).then((res) => res.data);

export const createBlog = (newBlog) =>
  axios
    .post(`${baseUrl}/blogs`, newBlog, { headers })
    .then((response) => response.data);

export const updateBlog =   async (blog) =>{
  const object = { ...blog, likes: blog.likes + 1 }
  const response =  await axios.put(`${baseUrl}/blogs/${blog.id}`, object, { headers })
  return response.data
}
  
export const deleteBlog = (blogId) =>
  axios
    .delete(`${baseUrl}/blogs/${blogId}`, { headers })
    .then((response) => response.data);
