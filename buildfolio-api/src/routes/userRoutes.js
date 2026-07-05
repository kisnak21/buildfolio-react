import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../services/userService.js'

const router = Router()

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json({ success: true, data: users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'email and password are required' })
    }
    const user = await loginUser({ email, password })
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' })
    }
    res.json({ success: true, data: user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, data: user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, password, image, bio } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'name, email, and password are required',
      })
    }
    const user = await createUser({ name, email, password, image, bio })
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/users/:id
router.patch('/:id', async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, data: user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await deleteUser(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
