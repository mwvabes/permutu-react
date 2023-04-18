import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

const rootReducer = {
  reducer: {
    user: userReducer,
    userResponseCode: userReducer,
  }
}

const store = configureStore(rootReducer)

export default store