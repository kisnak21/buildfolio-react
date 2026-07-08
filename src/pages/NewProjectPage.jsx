import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProject } from '../store/redux/projectsSlice'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const NewProjectPage = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (projectData) => {
    setSubmitError(null)
    if (!currentUser?.id) {
      setSubmitError('You must be logged in to create a project.')
      return
    }
    const result = await dispatch(
      addProject({
        ...projectData,
        user_id: currentUser.id,
      }),
    )
    if (addProject.fulfilled.match(result)) {
      navigate('/dashboard')
    } else {
      setSubmitError(result.payload)
    }
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header />

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
