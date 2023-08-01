import axios from 'axios';

//default config
const axiosParams = {
    //baseURL: 'http://localhost:3001' //json-server
    baseURL: 'api/persons'
}

//create axios instance with default params
const axiosInstance = axios.create(axiosParams);

//main api function
const api = (axios) => {
    return {
        get: function(url, config = {}){
            return axios.get(url,config);
        },
        delete: function(url,config = {}){
            return axios.delete(url,config);
        },
        post: function(url,body,config={}){
            return axios.post(url,body,config);
        },
        put: function(url,body,config={}){
            return axios.put(url,body,config);
        }

    }
}

export default api(axiosInstance);