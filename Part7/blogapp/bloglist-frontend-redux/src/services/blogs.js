import axios from 'axios';
import storageService from '../services/storage';
const baseUrl = 'http://localhost:3003/api/blogs';

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  return request.data;
};

const update = async (blog) => {
  const object = { ...blog, likes: blog.likes + 1 };
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

const createComment = (id, comment) => {
  return axios.post(`${baseUrl}/${id}/comments`, { content: comment });
};

const getComments = (id) => {
  return axios.get(`${baseUrl}/${id}/comments`);
}

export default { getAll, create, update, remove, createComment };
