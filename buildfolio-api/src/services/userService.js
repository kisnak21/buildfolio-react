import pool from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import transporter from '../config/email.js'
import dotenv from 'dotenv'

dotenv.config()

const SALT_ROUNDS = 10

export const getAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, name, username, email, image, bio, is_verified, created_at FROM users ORDER BY created_at DESC',
  )
  return result.rows
}

export const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, username, email, image, bio, is_verified, created_at FROM users WHERE id = $1',
    [id],
  )
  return result.rows[0] || null
}

export const createUser = async ({ name, email, password, image, bio }) => {
  const id = uuidv4()
  const username = name.toLowerCase().replace(/\s+/g, '')
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  const verificationToken = uuidv4()

  const result = await pool.query(
    `INSERT INTO users (id, name, username, email, password, image, bio, verification_token, is_verified)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
     RETURNING id, name, username, email, image, bio, is_verified, created_at`,
    [
      id,
      name,
      username,
      email,
      hashedPassword,
      image || null,
      bio || null,
      verificationToken,
    ],
  )

  const user = result.rows[0]

  // Send verification email
  await transporter.sendMail({
    from: '"Buildfolio" <noreply@buildfolio.dev>',
    to: email,
    subject: 'Verify your Buildfolio account',
    html: `
      <h2>Welcome to Buildfolio, ${name}!</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="http://localhost:3000/api/users/verify-email?token=${verificationToken}">
        Verify Email
      </a>
      <p>This link will verify your account immediately.</p>
    `,
  })

  return user
}

export const loginUser = async ({ email, password }) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ])

  const user = result.rows[0]
  if (!user) return null

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) return null

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.image,
      bio: user.bio,
      is_verified: user.is_verified,
    },
  }
}

export const verifyEmail = async (token) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE verification_token = $1',
    [token],
  )

  const user = result.rows[0]
  if (!user) return null

  await pool.query(
    'UPDATE users SET is_verified = true, verification_token = NULL WHERE id = $1',
    [user.id],
  )

  return user
}

export const updateUser = async (id, { name, image, bio }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($1, name),
         image = COALESCE($2, image),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING id, name, username, email, image, bio, is_verified, created_at`,
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
