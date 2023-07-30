import axios from 'axios';

//default config
const axiosParams = {
    baseURL: 'http://localhost:3000'
}

//create axios instance with default params
const axiosInstance = axios.create(axiosParams);

//main api function
const api = (axios) => {
    return {
        get: function(url, config = {}){
            return axios.get(url,config);
        }
    }
}

export default api(axiosInstance);