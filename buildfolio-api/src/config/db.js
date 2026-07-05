import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool
  .connect()
  .then(() => console.log('Connected to PostgreSQL (Neon)'))
  .catch((err) => console.error('Database connection error:', err.message))

export default pool
