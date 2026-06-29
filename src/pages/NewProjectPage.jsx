import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const NewProjectPage = ({ onAdd, currentUser, onLogout }) => {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (projectData) => {
    setSubmitError(null)
    try {
      await onAdd(projectData)
      navigate('/dashboard')
    } catch (err) {
      setSubmitError('Failed to create project. Please try again.')
    }
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header currentUser={currentUser} onLogout={onLogout} />

      <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
        <h1 className='text-xl font-semibold text-gray-900 mb-1'>
          New Project
        </h1>
        <p className='text-sm text-gray-500 mb-8'>
          Add a project to your portfolio
        </p>

        {submitError && (
          <p className='text-sm text-red-500 mb-4'>{submitError}</p>
        )}

        <ProjectForm onSubmit={handleSubmit} submitLabel='Create Project' />
      </main>

      <Footer />
    </div>
  )
}

export default NewProjectPage
