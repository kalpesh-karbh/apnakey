import axios from 'axios'
import { API_URL } from '../configs/Endpoints'

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AxiosInstance.interceptors.request.use(
  async config => {
    try {
      const jwtToken = localStorage.getItem('accessToken')
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`
      }
    } catch (error) {
      console.error('Error getting token:', error)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default AxiosInstance
