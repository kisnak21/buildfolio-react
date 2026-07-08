import { Router } from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectService.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { search, category, sort } = req.query
    const projects = await getAllProjects({ search, category, sort })
    res.json({ success: true, data: projects })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id)
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, data: project })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/projects
router.post('/', authMiddleware.verifyToken, async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      thumbnail,
      github_url,
      live_url,
      user_id,
      category_id,
    } = req.body

    if (!title || !slug || !description || !user_id) {
      return res.status(400).json({
        success: false,
        message: 'title, slug, description, and user_id are required',
      })
    }

    const project = await createProject({
      title,
      slug,
      description,
      thumbnail,
      github_url,
      live_url,
      user_id,
      category_id,
    })
    res.status(201).json({ success: true, data: project })
  } catch (err) {
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ success: false, message: 'Slug already exists' })
    }
    if (err.code === '23503') {
      return res
        .status(400)
        .json({ success: false, message: 'user_id does not exist' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// PATCH /api/projects/:id
router.patch('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    const project = await updateProject(req.params.id, req.body)
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, data: project })
  } catch (err) {
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ success: false, message: 'Slug already exists' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
})

// DELETE /api/projects/:id
router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
  try {
    const project = await deleteProject(req.params.id)
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, message: 'Project deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
