import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from 'api/userApi'

export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => {
    const currentUser = await userApi.getUser()
    return currentUser
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
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer