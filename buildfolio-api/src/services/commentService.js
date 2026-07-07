import pool from '../config/db.js'
import crypto from 'crypto'

export const getCommentsByProject = async (projectId) => {
  const result = await pool.query(
    `SELECT c.*, u.name as author_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.project_id = $1
     ORDER BY c.created_at DESC`,
    [projectId],
  )
  return result.rows
}

export const addComment = async ({ content, user_id, project_id }) => {
  const id = crypto.randomUUID()
  const result = await pool.query(
    `INSERT INTO comments (id, content, user_id, project_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, content, user_id, project_id],
  )
  return result.rows[0]
}

export const deleteComment = async (id) => {
  const result = await pool.query(
    'DELETE FROM comments WHERE id = $1 RETURNING id',
    [id],
  )
  return result.rows[0] || null
}
