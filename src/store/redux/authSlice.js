import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('buildfolio_user')
const parsedUser = storedUser ? JSON.parse(storedUser) : null

const getStoredBookmarks = (user) => {
  if (!user) return []
  const stored = localStorage.getItem(`buildfolio_bookmarks_${user.email}`)
  return stored ? JSON.parse(stored) : []
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: parsedUser,
    authChecked: true,
    bookmarks: getStoredBookmarks(parsedUser),
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload
      state.bookmarks = getStoredBookmarks(action.payload)
      localStorage.setItem('buildfolio_user', JSON.stringify(action.payload))
    },
    logoutUser: (state) => {
      state.currentUser = null
      state.bookmarks = []
      localStorage.removeItem('buildfolio_user')
    },
    toggleBookmark: (state, action) => {
      const projectId = action.payload
      const index = state.bookmarks.indexOf(projectId)
      if (index === -1) {
        state.bookmarks.push(projectId)
      } else {
        state.bookmarks.splice(index, 1)
      }
      if (state.currentUser) {
        localStorage.setItem(
          `buildfolio_bookmarks_${state.currentUser.email}`,
          JSON.stringify(state.bookmarks),
        )
      }
    },
    updateProfile: (state, action) => {
      const { name, bio } = action.payload
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, name, bio }
        localStorage.setItem(
          'buildfolio_user',
          JSON.stringify(state.currentUser),
        )
      }
    },
  },
})

export const { loginUser, logoutUser, toggleBookmark, updateProfile } =
  authSlice.actions
export default authSlice.reducer
