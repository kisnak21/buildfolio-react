import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
  },
})

export default store
