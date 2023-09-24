import axios from 'axios'
import storageService from './services/storage';

const baseUrl = 'http://localhost:3003/api'
const headers = {
    Authorization: storageService.loadUser()
      ? `Bearer ${storageService.loadUser().token}`
      : null,
  };

export const getAll = () =>
  axios.get(`${baseUrl}/blogs`).then(res => res.data)

export const createBlog = newBlog =>
  axios.post(`${baseUrl}/blogs`, newBlog,{ headers }).then(response => response.data)

export const updateBlog = updatedBlog =>
  axios.put(`${baseUrl}/blogs/${updatedBlog.id}`, updatedBlog).then(response => response.data)