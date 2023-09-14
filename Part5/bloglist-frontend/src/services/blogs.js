import api from './api'
import console from '../utils/console'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = { headers: { Authorization: token } }

const getAll = async() => {
  try {
    const response = await api.get('/blogs')
    return  response.data
  } catch (error) {
    console.log(`%cError: ${console.faceScreaming} %c${error}`, console.style1, console.style2)
    throw new Error(error.response.data.error);
  }

}

export default { getAll, setToken }