/* eslint-disable */
import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add an interceptor to remove the token from the header when the user closes the site
window.addEventListener('beforeunload', () => {
  instance.defaults.headers.common['Authorization'] = null
})

export default instance
/* eslint-disable */
