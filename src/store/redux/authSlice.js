import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('buildfolio_user')
const parsedUser = storedUser ? JSON.parse(storedUser) : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: parsedUser,
    authChecked: true,
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload
      localStorage.setItem('buildfolio_user', JSON.stringify(action.payload))
    },
    logoutUser: (state) => {
      state.currentUser = null
      localStorage.removeItem('buildfolio_user')
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

export const { loginUser, logoutUser, updateProfile } = authSlice.actions
export default authSlice.reducer
