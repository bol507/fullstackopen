import api from './api'
import ws from '../utils/warningSelf'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}



const getAll = async () => {
  try {
    const response = await api.get('/blogs')
    return response.data
  } catch (error) {
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error)
  }
}

const create = async newObject => {
  try {
    if (!newObject.title || !newObject.author) {
      throw new Error('Title and author are required')
    }
    const config = { headers: { 'Authorization': token } }
    const response = await api.post('/blogs', newObject, config)
    return response.data
  } catch (error) {
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error)
  }
}

const update = async (newObject) => {
  try{
    const config = { headers: { 'Authorization': token } }
    const response = await api.put(`/blogs/${newObject.id}`, newObject, config)
    return response.data
  }catch(error){
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error)
  }
}

const remove = async (id) => {
  try{
    const config = { headers: { 'Authorization': token } }
    const response = await api.delete(`/blogs/${id}`, config)
    return response.data
  }catch(error){
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error)
  }
}

const getUserId = async (user) => {
  try {
    const config = { headers: { 'Authorization': token } }
    const response = await api.get('/users',config)
    const userData = response.data.find((u) => u.username === user.username)
    return userData.id
  } catch (error) {
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error)
  }
}

export default { getAll, setToken, create, update, remove, getUserId }