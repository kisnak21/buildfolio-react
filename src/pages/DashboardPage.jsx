import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectTable from '../components/dashboard/ProjectTable'

const DashboardPage = ({ projects, onDelete, currentUser, onLogout }) => {
  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header currentUser={currentUser} onLogout={onLogout} />

      <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-xl font-semibold text-gray-900 mb-1'>
              Dashboard
            </h1>
            <p className='text-sm text-gray-500'>Manage your projects</p>
          </div>
          <Link
            to='/projects/new'
            className='bg-primary hover:bg-primary-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors'
          >
            + New Project
          </Link>
        </div>

        <ProjectTable projects={projects} onDelete={onDelete} />
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
