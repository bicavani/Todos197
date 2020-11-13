import axiosClient from './axiosClient'

const userApi = {
  getUser: () => {
    const url = '/user/me'
    return axiosClient.get(url)
  },

  updatePassword: data => {
    const url = `/user/edit-password`
    return axiosClient.put(url, data)
  }
}

export default userApi