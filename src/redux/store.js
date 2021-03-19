import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './userReducer';

export default configureStore({
  reducer: {
      user: UserReducer,
  }
})