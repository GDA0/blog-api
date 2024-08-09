import axios from 'axios'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/admin'
})

export default axiosInstance
