import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUserBookmarks,
  addBookmark as addBookmarkApi,
  removeBookmark as removeBookmarkApi,
} from '../../services/api/bookmarksApi.js'

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserBookmarks(userId)
    } catch (err) {
      return rejectWithValue('Failed to load bookmarks.')
    }
  },
)

export const addBookmark = createAsyncThunk(
  'bookmarks/add',
  async ({ user_id, project_id }, { rejectWithValue }) => {
    try {
      return await addBookmarkApi({ user_id, project_id })
    } catch (err) {
      return rejectWithValue('Failed to add bookmark.')
    }
  },
)

export const removeBookmark = createAsyncThunk(
  'bookmarks/remove',
  async ({ bookmarkId }, { rejectWithValue }) => {
    try {
      await removeBookmarkApi(bookmarkId)
      return bookmarkId
    } catch (err) {
      return rejectWithValue('Failed to remove bookmark.')
    }
  },
)

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload)
      })
  },
})

export default bookmarksSlice.reducer
