import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '',
})

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }
    return response
  },

  error => {
    throw error
  }
)

export default axiosClient

export const setAuthTokenRequest = token => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = token
  } else {
    delete axiosClient.defaults.headers.common['Authorization']
  }
}

