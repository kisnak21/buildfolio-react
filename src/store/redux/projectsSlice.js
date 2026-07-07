import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getProjects,
  createProject,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi,
} from '../../services/api/projectsApi'

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getProjects()
    } catch (err) {
      return rejectWithValue('Failed to load projects. Please try again.')
    }
  },
)

export const addProject = createAsyncThunk(
  'projects/add',
  async (project, { rejectWithValue }) => {
    try {
      return await createProject({ ...project, likes: 0 })
    } catch (err) {
      return rejectWithValue('Failed to create project. Please try again.')
    }
  },
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      return await updateProjectApi(id, updatedFields)
    } catch (err) {
      return rejectWithValue('Failed to update project. Please try again.')
    }
  },
)

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProjectApi(id)
      return id
    } catch (err) {
      return rejectWithValue('Failed to delete project. Please try again.')
    }
  },
)

export const likeProject = createAsyncThunk(
  'projects/like',
  async ({ id, currentLikes }, { rejectWithValue }) => {
    try {
      await updateProjectApi(id, { likes: currentLikes + 1 })
      return { id, likes: currentLikes + 1 }
    } catch (err) {
      return rejectWithValue('Failed to like project.')
    }
  },
)

// Slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchProjects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // addProject
    builder
      .addCase(addProject.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addProject.rejected, (state, action) => {
        state.error = action.payload
      })

    // updateProject
    builder
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload
      })

    // deleteProject
    builder
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload
      })

    // likeProject
    builder.addCase(likeProject.fulfilled, (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) state.items[index].likes = action.payload.likes
    })
  },
})

export default projectsSlice.reducer
