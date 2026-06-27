import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const EditProjectPage = ({ projects, onUpdate }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const project = projects.find((p) => p.id === Number(id))

  const handleSubmit = (projectData) => {
    onUpdate(project.id, projectData)
    navigate('/dashboard')
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
        <h1 className='text-xl font-semibold text-gray-900 mb-1'>Edit Project</h1>
        <p className='text-sm text-gray-500 mb-8'>Update your project details</p>

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