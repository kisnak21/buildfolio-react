import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('buildfolio_user')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: storedUser ? JSON.parse(storedUser) : null,
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
  },
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
