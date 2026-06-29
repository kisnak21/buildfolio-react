import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const EditProjectPage = ({ projects, onUpdate, currentUser, onLogout }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState(null)

  const project = projects.find((p) => p.id === id)

  const handleSubmit = async (projectData) => {
    setSubmitError(null)
    try {
      await onUpdate(project.id, projectData)
      navigate('/dashboard')
    } catch (err) {
      setSubmitError('Failed to update project. Please try again.')
    }
  }

  if (!project) {
    return (
      <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
        <Header currentUser={currentUser} onLogout={onLogout} />
        <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
          <p className='text-sm text-gray-500'>Project not found.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header currentUser={currentUser} onLogout={onLogout} />

      <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
        <h1 className='text-xl font-semibold text-gray-900 mb-1'>
          Edit Project
        </h1>
        <p className='text-sm text-gray-500 mb-8'>
          Update your project details
        </p>
        {submitError && (
          <p className='text-sm text-red-500 mb-4'>{submitError}</p>
        )}
        <ProjectForm
          initialValues={project}
          onSubmit={handleSubmit}
          submitLabel='Save Changes'
        />
      </main>

      <Footer />
    </div>
  )
}

export default EditProjectPage
