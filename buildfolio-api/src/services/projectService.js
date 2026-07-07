import pool from '../config/db.js'
import crypto from 'crypto'

export const getAllProjects = async () => {
  const result = await pool.query(
    `SELECT 
      p.*,
      u.name as author_name,
      c.name as category_name,
      COALESCE(
        json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
        '[]'
      ) as technologies
     FROM projects p
     LEFT JOIN users u ON p.user_id = u.id
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN project_technologies pt ON p.id = pt.project_id
     LEFT JOIN technologies t ON pt.technology_id = t.id
     GROUP BY p.id, u.name, c.name
     ORDER BY p.created_at DESC`,
  )
  return result.rows
}

export const getProjectById = async (id) => {
  const result = await pool.query(
    `SELECT 
      p.*,
      u.name as author_name,
      c.name as category_name,
      COALESCE(
        json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
        '[]'
      ) as technologies
     FROM projects p
     LEFT JOIN users u ON p.user_id = u.id
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN project_technologies pt ON p.id = pt.project_id
     LEFT JOIN technologies t ON pt.technology_id = t.id
     WHERE p.id = $1
     GROUP BY p.id, u.name, c.name`,
    [id],
  )
  return result.rows[0] || null
}

export const createProject = async ({
  title,
  slug,
  description,
  thumbnail,
  github_url,
  live_url,
  user_id,
  category_id,
}) => {
  const id = crypto.randomUUID()
  const result = await pool.query(
    `INSERT INTO projects (id, title, slug, description, thumbnail, github_url, live_url, user_id, category_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      id,
      title,
      slug,
      description,
      thumbnail || null,
      github_url || null,
      live_url || null,
      user_id,
      category_id || null,
    ],
  )
  return result.rows[0]
}

export const updateProject = async (
  id,
  {
    title,
    slug,
    description,
    thumbnail,
    github_url,
    live_url,
    category_id,
    likes,
  },
) => {
  const result = await pool.query(
    `UPDATE projects
     SET title = COALESCE($1, title),
         slug = COALESCE($2, slug),
         description = COALESCE($3, description),
         thumbnail = COALESCE($4, thumbnail),
         github_url = COALESCE($5, github_url),
         live_url = COALESCE($6, live_url),
         category_id = COALESCE($7, category_id),
         likes = COALESCE($8, likes)
     WHERE id = $9
     RETURNING *`,
    [
      title || null,
      slug || null,
      description || null,
      thumbnail || null,
      github_url || null,
      live_url || null,
      category_id || null,
      likes ?? null,
      id,
    ],
  )
  return result.rows[0] || null
}

export const deleteProject = async (id) => {
  const result = await pool.query(
    'DELETE FROM projects WHERE id = $1 RETURNING id',
    [id],
  )
  return result.rows[0] || null
}
