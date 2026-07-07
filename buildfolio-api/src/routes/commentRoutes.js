import { Router } from 'express'
import {
  getCommentsByProject,
  addComment,
  deleteComment,
} from '../services/commentService.js'

const router = Router()

// GET /api/comments?projectId=
router.get('/', async (req, res) => {
  try {
    const { projectId } = req.query
    if (!projectId) {
      return res
        .status(400)
        .json({ success: false, message: 'projectId query param is required' })
    }
    const comments = await getCommentsByProject(projectId)
    res.json({ success: true, data: comments })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/comments
router.post('/', async (req, res) => {
  try {
    const { content, user_id, project_id } = req.body
    if (!content || !user_id || !project_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'content, user_id, and project_id are required',
        })
    }
    const comment = await addComment({ content, user_id, project_id })
    res.status(201).json({ success: true, data: comment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// DELETE /api/comments/:id
router.delete('/:id', async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id)
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: 'Comment not found' })
    }
    res.json({ success: true, message: 'Comment deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
