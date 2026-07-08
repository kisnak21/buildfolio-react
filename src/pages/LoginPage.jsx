import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/redux/authSlice'
import { loginUserApi } from '../services/api/authApi.js'
import AuthCard from '../components/layout/AuthCard'
import Input from '../components/ui/Input'
import Checkbox from '../components/ui/Checkbox'
import Button from '../components/ui/Button'
import GoogleButton from '../components/ui/GoogleButton'
import Divider from '../components/ui/Divider'
import SEO from '../components/ui/SEO.jsx'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage = () => {
  const dispatch = useDispatch()
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
      const user = await loginUserApi({ email: email.trim(), password })
      if (!user) {
        setErrors({ password: 'Invalid email or password.' })
        return
      }
      dispatch(
        loginUser({
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
        }),
      )
      navigate('/')
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({ password: 'Invalid email or password.' })
      } else {
        setErrors({ password: 'Something went wrong. Please try again.' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gray-50'>
      <SEO
        title='Login'
        description='Log in to your Buildfolio account to manage your projects and portfolio.'
      />
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
