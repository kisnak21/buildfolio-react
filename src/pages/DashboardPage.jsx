import { useSelector, useDispatch } from 'react-redux'
import { deleteProject } from '../store/redux/projectsSlice'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectTable from '../components/dashboard/ProjectTable'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const {
    items: projects,
    loading,
    error,
  } = useSelector((state) => state.projects)
  const { currentUser, bookmarks } = useSelector((state) => state.auth)

  const userProjects = projects.filter((p) => p.author === currentUser?.name)
  const totalLikes = userProjects.reduce((sum, p) => sum + (p.likes || 0), 0)
  const totalBookmarks = bookmarks.length

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
  }

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen flex flex-col'>
      <Header />

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

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white border border-gray-200 rounded-xl p-5'>
            <p className='text-xs text-gray-500 mb-1'>Total Projects</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {userProjects.length}
            </p>
          </div>
          <div className='bg-white border border-gray-200 rounded-xl p-5'>
            <p className='text-xs text-gray-500 mb-1'>Likes Received</p>
            <p className='text-2xl font-semibold text-gray-900'>{totalLikes}</p>
          </div>
          <div className='bg-white border border-gray-200 rounded-xl p-5'>
            <p className='text-xs text-gray-500 mb-1'>Bookmarks</p>
            <p className='text-2xl font-semibold text-gray-900'>
              {totalBookmarks}
            </p>
          </div>
        </div>

        {loading && (
          <p className='text-sm text-gray-400'>Loading projects...</p>
        )}
        {error && <p className='text-sm text-red-500'>{error}</p>}
        {!loading && !error && (
          <ProjectTable projects={projects} onDelete={handleDelete} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
