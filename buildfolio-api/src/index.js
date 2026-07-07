import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true })) // Allow requests from the frontend
const PORT = process.env.PORT || 3000

app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/bookmarks', bookmarkRoutes)
app.use('/api/comments', commentRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Buildfolio API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
