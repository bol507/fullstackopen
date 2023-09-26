import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';
let token = null;

const STORAGE_KEY = 'BlogAppUserRedux';

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
};

const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY)
  token = null;
};

const getToken = () => token;

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
  getUsers,
};
