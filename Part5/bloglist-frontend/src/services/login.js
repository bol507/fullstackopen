import api from './api'
import ws from '../utils/warningSelf'


const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials)
        return response.data
    } catch (error) {
        console.log(`%cError: ${ws.faceScreaming} %c${error}`, ws.style1, ws.style2)
        throw new Error(error.response.data.error);
        
    }
}

export default { login }