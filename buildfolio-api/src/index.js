import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Buildfolio API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
