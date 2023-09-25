import axios from 'axios';
import storageService from './services/storage';

let token = null;

const STORAGE_KEY = 'bloggappUser';
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

export const updateBlog = async (blog) => {
  const object = { ...blog, likes: blog.likes + 1 };
  const response = await axios.put(`${baseUrl}/blogs/${blog.id}`, object, {
    headers,
  });
  return response.data;
};

export const deleteBlog = (blogId) =>
  axios
    .delete(`${baseUrl}/blogs/${blogId}`, { headers })
    .then((response) => response.data);

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }
  return null;
};

export const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY);
  token = null;
};

export const getToken = () => token;

