import axiosClient from './axiosClient'

const userApi = {
  getUser: () => {
    const url = '/user/me'
    return axiosClient.get(url)
  }
}

export default userApi