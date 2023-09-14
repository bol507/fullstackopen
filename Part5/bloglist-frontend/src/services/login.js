import api from './api'
import console from '../utils/console'


const login = async (credentials) => {
    try {
        console.log(credentials)
        const response = await api.post('/login', credentials)
        return response.data
    } catch (error) {
        console.log(error)
        console.log(`%cError: ${console.faceScreaming} %c${error}`, console.style1, console.style2)
        throw new Error(error.response.data.error);
        
    }
}

export default { login }