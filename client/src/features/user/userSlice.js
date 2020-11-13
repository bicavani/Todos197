import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from 'api/userApi'

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const currentUser = await userApi.getUser()
    return currentUser
  }
)

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async data => {
    const res = await userApi.updatePassword(data)
    return res.user
  }
)

const initialState = {
  current: {},
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.current = action.payload
    }
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.current = action.payload
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.current = action.payload
    },
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer