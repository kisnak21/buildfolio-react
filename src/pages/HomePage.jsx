import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Hero from '../components/home/Hero'
import Section from '../components/home/Section'
import ProjectCard from '../components/home/ProjectCard'
import CategoryCard from '../components/home/CategoryCard'
import TechPill from '../components/home/TechPill'
import { categories, technologies } from '../data/projects'

const HomePage = ({ projects, loading, error, currentUser, onLogout }) => {
  const sortedByLikes = [...projects].sort((a, b) => b.likes - a.likes)
  const featuredProjects = sortedByLikes.slice(0, 3)
  const favoriteProjects = sortedByLikes.slice(3, 6)

  return (
    <div className='bg-gray-50 text-gray-900'>
      <Header currentUser={currentUser} onLogout={onLogout} />

      <main>
        <Hero />

        <Section
          id='projects'
          title='Featured Projects'
          subtitle='Handpicked by the community'
          viewAllHref='#'
        >
          {loading && (
            <p className='text-sm text-gray-400'>Loading projects...</p>
          )}
          {error && <p className='text-sm text-red-500'>{error}</p>}
          {!loading && !error && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </Section>

        <Section
          id='categories'
          title='Browse by Category'
          subtitle='Find projects that match your interests'
        >
          {loading && (
            <p className='text-sm text-gray-400'>Loading categories...</p>
          )}
          {error && <p className='text-sm text-red-500'>{error}</p>}
          {!loading && !error && (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
              {categories.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </div>
          )}
        </Section>

        <Section
          id='technologies'
          title='Trending Technologies'
          subtitle='What developers are building with right now'
        >
          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech) => (
              <TechPill key={tech.name} {...tech} />
            ))}
          </div>
        </Section>

        <Section
          title='Community Favorites'
          subtitle='Most liked projects this month'
          viewAllHref='#'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {favoriteProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
