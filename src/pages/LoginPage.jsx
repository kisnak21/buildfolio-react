import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers } from '../services/api/usersApi'
import AuthCard from '../components/layout/AuthCard'
import Input from '../components/ui/Input'
import Checkbox from '../components/ui/Checkbox'
import Button from '../components/ui/Button'
import GoogleButton from '../components/ui/GoogleButton'
import Divider from '../components/ui/Divider'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      const users = await getUsers()
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      )

      if (!matchedUser) {
        setErrors({ email: 'No account found with this email.' })
        return
      }

      if (matchedUser.password !== password) {
        setErrors({ password: 'Incorrect password.' })
        return
      }

      onLogin({ name: matchedUser.name, email: matchedUser.email })
      navigate('/')
    } catch (err) {
      setErrors({ password: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gray-50'>
      <AuthCard
        title='Welcome back'
        subtitle='Log in to your Buildfolio account'
      >
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label='Email'
            type='email'
            id='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label='Password'
            type='password'
            id='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            rightElement={
              <a
                href='#'
                className='text-xs text-primary hover:text-primary-hover transition-colors'
              >
                Forgot password?
              </a>
            }
          />

          <div className='mb-6'>
            <Checkbox
              id='remember'
              label='Remember me'
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          </div>

          <div className='mb-3'>
            <Button type='submit' fullWidth disabled={submitting}>
              {submitting ? 'Logging in...' : 'Log in'}
            </Button>
          </div>

          <GoogleButton>Continue with Google</GoogleButton>
        </form>

        <Divider />

        <p className='text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-primary hover:text-primary-hover transition-colors font-medium'
          >
            Register
          </Link>
        </p>
      </AuthCard>
    </div>
  )
}

export default LoginPage
