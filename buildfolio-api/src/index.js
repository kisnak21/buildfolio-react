import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import upload from './middleware/upload.js'
import transporter from './config/email.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true })) // Allow requests from the frontend
const PORT = process.env.PORT || 3000

app.use(express.json())

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' })
  }
  res.json({
    success: true,
    data: {
      filename: req.file.filename,
      url: `http://localhost:3000/upload/${req.file.filename}`,
    },
  })
})

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'name, email, and message are required',
      })
    }

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'admin@buildfolio.dev',
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    res.json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/bookmarks', bookmarkRoutes)
app.use('/api/comments', commentRoutes)
app.use('/upload', express.static('upload'))
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Buildfolio API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
