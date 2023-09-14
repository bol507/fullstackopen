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
    throw new Error(error.response.data.error);
  }
}

const create = async newObject => {
  try {
    if (!newObject.title || !newObject.author) {
      throw new Error('Title and author are required');
    }
    const config = { headers: { 'Authorization': token } }
    const response = await api.post('/blogs', newObject, config)
    return response.data
  } catch (error) {
    console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
    throw new Error(error.response.data.error);
  }
}

export default { getAll, setToken, create }