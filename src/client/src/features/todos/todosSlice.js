import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import todoApi from 'api/todoApi'

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo._id,  //_id: id by mongodb create auto
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await todoApi.getAll()
    return res.todos
  }
)

export const deleteAllTodos = createAsyncThunk(
  'todos/deleteAllTodos',
  async () => {
    const res = await todoApi.deleteAll()
    return res.todos
  }
)

export const addNewTodo = createAsyncThunk(
  'todo/addNewTodo',
  async (todoAdd) => {
    const res = await todoApi.add(todoAdd)
    return res.todo
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ([todoId, todoUpdate]) => {
    const res = await todoApi.update(todoId, todoUpdate)
    return res.todos
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (todoId) => {
    const res = await todoApi.delete(todoId)
    return res.todos
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      todosAdapter.upsertMany(state, action.payload)
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewTodo.fulfilled]: todosAdapter.addOne,
    [updateTodo.fulfilled]: todosAdapter.setAll,
    [deleteTodo.fulfilled]: todosAdapter.setAll,
    [deleteAllTodos.fulfilled]: todosAdapter.setAll,
  }
})

export default todosSlice.reducer

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => state.todos)