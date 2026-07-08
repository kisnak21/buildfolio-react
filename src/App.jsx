import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './store/redux/projectsSlice'
import { fetchBookmarks } from './store/redux/bookmarksSlice'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NewProjectPage from './pages/NewProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import UserProfilePage from './pages/UserProfilePage'
import BookmarksPage from './pages/BookmarksPage'
import SettingsPage from './pages/SettingsPage'
import ProjectsPage from './pages/ProjectsPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const dispatch = useDispatch()
  const { currentUser, authChecked } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchBookmarks(currentUser.id))
    }
  }, [currentUser?.id])

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
        <Route path='/projects' element={<ProjectsPage />} />
        <Route
          path='/projects/edit/:id'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <EditProjectPage />
            </ProtectedRoute>
          }
        />
        <Route path='/u/:author' element={<UserProfilePage />} />
        <Route
          path='/bookmarks'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <BookmarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
