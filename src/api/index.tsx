import axios from 'axios'

const baseURL = "http://194.195.247.179"

export const bareAPI = axios.create({
    baseURL: "http://194.195.247.179",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Origin': 'localhost:3000',
    }
})

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})


export const ghapi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
})

ghapi.interceptors.request.use(
  config => {
    const token = localStorage.getItem("githubAccess")
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
)


export default api
