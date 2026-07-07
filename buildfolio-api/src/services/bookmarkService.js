import pool from '../config/db.js'
import crypto from 'crypto'

export const getBookmarksByUser = async (userId) => {
  const result = await pool.query(
    `SELECT b.*, p.title, p.slug, p.description, p.likes,
            p.github_url, p.live_url, u.name as author_name
     FROM bookmarks b
     JOIN projects p ON b.project_id = p.id
     JOIN users u ON p.user_id = u.id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId],
  )
  return result.rows
}

export const addBookmark = async ({ user_id, project_id }) => {
  const id = crypto.randomUUID()
  const result = await pool.query(
    `INSERT INTO bookmarks (id, user_id, project_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id, user_id, project_id],
  )
  return result.rows[0]
}

export const removeBookmark = async (id) => {
  const result = await pool.query(
    'DELETE FROM bookmarks WHERE id = $1 RETURNING id',
    [id],
  )
  return result.rows[0] || null
}

export const getBookmark = async ({ user_id, project_id }) => {
  const result = await pool.query(
    'SELECT * FROM bookmarks WHERE user_id = $1 AND project_id = $2',
    [user_id, project_id],
  )
  return result.rows[0] || null
}
