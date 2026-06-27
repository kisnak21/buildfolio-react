import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectForm from '../components/dashboard/ProjectForm'

const NewProjectPage = ({ onAdd }) => {
  const navigate = useNavigate()

  const handleSubmit = (projectData) => {
    onAdd(projectData)
    navigate('/dashboard')
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
        <h1 className='text-xl font-semibold text-gray-900 mb-1'>New Project</h1>
        <p className='text-sm text-gray-500 mb-8'>Add a project to your portfolio</p>

        <ProjectForm onSubmit={handleSubmit} submitLabel='Create Project' />
      </main>

      <Footer />
    </div>
  )
}

export default NewProjectPage