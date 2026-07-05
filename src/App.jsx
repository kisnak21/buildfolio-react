import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './store/redux/projectsSlice'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NewProjectPage from './pages/NewProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

const App = () => {
  const dispatch = useDispatch()
  const { currentUser, authChecked } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/projects/new'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <NewProjectPage />
            </ProtectedRoute>
          }
        />
        <Route path='/projects/:id' element={<ProjectDetailPage />} />
        <Route
          path='/projects/edit/:id'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <EditProjectPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
