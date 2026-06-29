import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ currentUser, authChecked, children }) => {
  if (!authChecked) {
    return null
  }

  if (!currentUser) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
