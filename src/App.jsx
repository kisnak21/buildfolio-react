import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NewProjectPage from './pages/NewProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import { projects as initialProjects } from './data/projects'

const App = () => {
  const [projects, setProjects] = useState(initialProjects)

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      likes: 0,
    }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    )
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage projects={projects} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/dashboard'
          element={
            <DashboardPage projects={projects} onDelete={deleteProject} />
          }
        />
        <Route
          path='/projects/new'
          element={<NewProjectPage onAdd={addProject} />}
        />
        <Route
          path='/projects/edit/:id'
          element={
            <EditProjectPage projects={projects} onUpdate={updateProject} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App