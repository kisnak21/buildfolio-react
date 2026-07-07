import { Router } from 'express'
import {
  getBookmarksByUser,
  addBookmark,
  removeBookmark,
  getBookmark,
} from '../services/bookmarkService.js'

const router = Router()

// GET /api/bookmarks?userId=
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'userId query param is required' })
    }
    const bookmarks = await getBookmarksByUser(userId)
    res.json({ success: true, data: bookmarks })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/bookmarks
router.post('/', async (req, res) => {
  try {
    const { user_id, project_id } = req.body
    if (!user_id || !project_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'user_id and project_id are required',
        })
    }
    const existing = await getBookmark({ user_id, project_id })
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: 'Already bookmarked' })
    }
    const bookmark = await addBookmark({ user_id, project_id })
    res.status(201).json({ success: true, data: bookmark })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// DELETE /api/bookmarks/:id
router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await removeBookmark(req.params.id)
    if (!bookmark) {
      return res
        .status(404)
        .json({ success: false, message: 'Bookmark not found' })
    }
    res.json({ success: true, message: 'Bookmark removed' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
