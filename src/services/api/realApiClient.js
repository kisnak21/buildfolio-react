import axios from 'axios'

const realApiClient = axios.create({
  baseURL: import.meta.env.VITE_REAL_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default realApiClient
