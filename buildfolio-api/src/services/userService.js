import pool from '../config/db.js'
import crypto from 'crypto'

export const getAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, name, email, image, bio, created_at FROM users ORDER BY created_at DESC',
  )
  return result.rows
}

export const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email, image, bio, created_at FROM users WHERE id = $1',
    [id],
  )
  return result.rows[0] || null
}

export const createUser = async ({ name, email, password, image, bio }) => {
  const id = crypto.randomUUID()
  const result = await pool.query(
    `INSERT INTO users (id, name, email, password, image, bio)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, image, bio, created_at`,
    [id, name, email, password, image || null, bio || null],
  )
  return result.rows[0]
}

export const updateUser = async (id, { name, image, bio }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($1, name),
         image = COALESCE($2, image),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING id, name, email, image, bio, created_at`,
    [name || null, image || null, bio || null, id],
  )
  return result.rows[0] || null
}

export const deleteUser = async (id) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id',
    [id],
  )
  return result.rows[0] || null
}

export const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    'SELECT id, name, email, image, bio, created_at, password FROM users WHERE email = $1',
    [email],
  )

  const user = result.rows[0]
  if (!user) return null

  if (user.password !== password) return null

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
