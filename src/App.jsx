import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NewProjectPage from './pages/NewProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import {
  getProjects,
  createProject,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi,
} from './services/api/projectsApi'

const App = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  // stored users to local storage
  useEffect(() => {
    const stored = localStorage.getItem('buildfolio_user')
    if (stored) {
      setCurrentUser(JSON.parse(stored))
    }
    setAuthChecked(true)
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError('Failed to load projects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addProject = async (project) => {
    const newProject = await createProject({ ...project, likes: 0 })
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = async (id, updatedFields) => {
    const updated = await updateProjectApi(id, updatedFields)
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  const deleteProject = async (id) => {
    await deleteProjectApi(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const likeProject = async (id) => {
    const project = projects.find((p) => p.id === id)
    if (!project) return
    const updated = await updateProjectApi(id, { likes: project.likes + 1 })
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem('buildfolio_user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('buildfolio_user')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              projects={projects}
              loading={loading}
              error={error}
              currentUser={currentUser}
              onLogout={handleLogout}
              onLike={likeProject}
            />
          }
        />
        <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path='/register'
          element={<RegisterPage onLogin={handleLogin} />}
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <DashboardPage
                projects={projects}
                loading={loading}
                error={error}
                onDelete={deleteProject}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/projects/new'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <NewProjectPage
                onAdd={addProject}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/projects/edit/:id'
          element={
            <ProtectedRoute currentUser={currentUser} authChecked={authChecked}>
              <EditProjectPage
                projects={projects}
                onUpdate={updateProject}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
