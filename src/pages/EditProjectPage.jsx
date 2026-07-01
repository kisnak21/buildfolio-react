import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateProject } from '../store/redux/projectsSlice'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const EditProjectPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [submitError, setSubmitError] = useState(null)

  const project = useSelector((state) =>
    state.projects.items.find((p) => p.id === id),
  )

  const handleSubmit = async (projectData) => {
    setSubmitError(null)
    const result = await dispatch(
      updateProject({ id: project.id, updatedFields: projectData }),
    )
    if (updateProject.fulfilled.match(result)) {
      navigate('/dashboard')
    } else {
      setSubmitError(result.payload)
    }
  }

  if (!project) {
    return (
      <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
          <p className='text-sm text-gray-500'>Project not found.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header />

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
