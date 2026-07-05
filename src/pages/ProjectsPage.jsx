import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeProject } from '../store/redux/projectsSlice'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectCard from '../components/home/ProjectCard'

const ProjectsPage = () => {
  const dispatch = useDispatch()
  const {
    items: projects,
    loading,
    error,
  } = useSelector((state) => state.projects)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTech, setSelectedTech] = useState('')
  const [sortBy, setSortBy] = useState('likes')

  const filtered = projects.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === '' || p.category === selectedCategory
    const matchesTech =
      selectedTech === '' ||
      (Array.isArray(p.technologies) &&
        p.technologies.some((t) =>
          t.toLowerCase().includes(selectedTech.toLowerCase()),
        ))
    return matchesSearch && matchesCategory && matchesTech
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes
    if (sortBy === 'newest')
      return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  const handleLike = (id, currentLikes) => {
    dispatch(likeProject({ id, currentLikes }))
  }

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-6xl mx-auto px-4 py-12 w-full'>
        <div className='mb-8'>
          <h1 className='text-xl font-semibold text-gray-900 mb-1'>
            All Projects
          </h1>
          <p className='text-sm text-gray-500'>
            {projects.length} projects on Buildfolio
          </p>
        </div>

        {/* Filters */}
        <div className='flex flex-col md:flex-row gap-3 mb-6'>
          <input
            type='text'
            placeholder='Search projects...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors'
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors'
          >
            <option value=''>All Categories</option>
            <option value='SaaS'>SaaS</option>
            <option value='AI'>AI</option>
            <option value='Web App'>Web App</option>
            <option value='Mobile App'>Mobile App</option>
            <option value='Open Source'>Open Source</option>
            <option value='Game'>Game</option>
          </select>
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className='bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors'
          >
            <option value=''>All Technologies</option>
            <option value='Next.js'>Next.js</option>
            <option value='React'>React</option>
            <option value='TypeScript'>TypeScript</option>
            <option value='Python'>Python</option>
            <option value='PostgreSQL'>PostgreSQL</option>
            <option value='Tailwind'>Tailwind CSS</option>
            <option value='Go'>Go</option>
            <option value='Flutter'>Flutter</option>
            <option value='Laravel'>Laravel</option>
            <option value='Rust'>Rust</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors'
          >
            <option value='likes'>Most Liked</option>
            <option value='newest'>Newest</option>
            <option value='title'>A–Z</option>
          </select>
          {(search || selectedCategory || selectedTech) && (
            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('')
                setSelectedTech('')
              }}
              className='text-sm text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap'
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <p className='text-xs text-gray-400 mb-4'>
          {sorted.length} project{sorted.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {loading && (
          <p className='text-sm text-gray-400'>Loading projects...</p>
        )}
        {error && <p className='text-sm text-red-500'>{error}</p>}
        {!loading && !error && sorted.length === 0 && (
          <div className='bg-white border border-gray-200 rounded-xl p-12 text-center'>
            <p className='text-sm text-gray-400'>
              No projects match your filters.
            </p>
          </div>
        )}
        {!loading && !error && sorted.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {sorted.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onLike={handleLike}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProjectsPage
