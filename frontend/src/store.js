import { configureStore } from '@reduxjs/toolkit'
import  userSlicer  from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    user:userSlicer,
  },
})