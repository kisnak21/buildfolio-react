import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice.js'
import authReducer from './authSlice.js'
import bookmarksReducer from './bookmarksSlice.js'
import commentsReducer from './commentsSlice.js'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
    bookmarks: bookmarksReducer,
    comments: commentsReducer,
  },
})

export default store
