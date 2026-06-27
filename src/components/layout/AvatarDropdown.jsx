import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AvatarDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={ref}>
      <button onClick={() => setOpen(!open)} className='block'>
        <img
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.email}`}
          alt={user.name}
          className='w-8 h-8 rounded-full border border-gray-200'
        />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50'>
          <div className='px-4 py-2 border-b border-gray-100'>
            <p className='text-sm font-medium text-gray-900 truncate'>
              {user.name}
            </p>
            <p className='text-xs text-gray-500 truncate'>{user.email}</p>
          </div>
          <Link
            to='/dashboard'
            onClick={() => setOpen(false)}
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
            className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors'
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default AvatarDropdown
