import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getProjectComments,
  addComment as addCommentApi,
  deleteComment as deleteCommentApi,
} from '../../services/api/commentsApi.js'

export const fetchComments = createAsyncThunk(
  'comments/fetchByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await getProjectComments(projectId)
    } catch (err) {
      return rejectWithValue('Failed to load comments.')
    }
  },
)

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ content, user_id, project_id }, { rejectWithValue }) => {
    try {
      return await addCommentApi({ content, user_id, project_id })
    } catch (err) {
      return rejectWithValue('Failed to post comment.')
    }
  },
)

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCommentApi(id)
      return id
    } catch (err) {
      return rejectWithValue('Failed to delete comment.')
    }
  },
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload)
      })
  },
})

export const { clearComments } = commentsSlice.actions
export default commentsSlice.reducer
