import axiosClient from './axiosClient'

const todoApi = {
  getAll: () => {
    const url = '/todos'
    return axiosClient.get(url)
  },
  deleteAll: () => {
    const url = '/todos/delete-allTodos'
    return axiosClient.delete(url)
  },
  add: todoAdd => {
    const url = '/todos/add-todo'
    return axiosClient.post(url, todoAdd)
  },
  delete: todoId => {
    const url = `/todos/delete-todo/${todoId}`
    return axiosClient.delete(url)
  },
  update: (todoId, todoUpdate) => {
    const url = `/todos/edit-todo/${todoId}`
    return axiosClient.put(url, todoUpdate)
  }
}

export default todoApi