import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
const api = require('../data/user.data.ts')

export const getLoggedInThunk = createAsyncThunk(
  'users/getLoggedIn',
  async () => {
    const response = await api.getLoggedIn()
    return response
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uuid: "",
      country: "",
      createdAt: "",
      friends: [],
      updatedAt: "",
      username: ""
    },
    userResponseCode: undefined
  },
  reducers: {
    refresh: (state) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInThunk.fulfilled, (state, action) => {
      state.user = action.payload
      state.userResponseCode = action.payload.uuid === undefined || action.payload.uuid.length === 0 ? 500 : 200
    })
  },
});

export const { refresh } = userSlice.actions;

export default userSlice.reducer;