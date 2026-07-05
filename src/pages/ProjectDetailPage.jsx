import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleBookmark } from '../store/redux/authSlice'
import { likeProject } from '../store/redux/projectsSlice'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const ProjectDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const project = useSelector((state) =>
    state.projects.items.find((p) => p.id === id),
  )
  const { currentUser, bookmarks } = useSelector((state) => state.auth)
  const isBookmarked = bookmarks.includes(id)

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem(`buildfolio_comments_${id}`)
    return stored ? JSON.parse(stored) : []
  })

  const handleLike = () => {
    dispatch(likeProject({ id, currentLikes: project.likes }))
  }

  const handleBookmark = () => {
    if (!currentUser) return navigate('/login')
    dispatch(toggleBookmark(id))
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    if (!currentUser) return navigate('/login')
    const newComment = {
      id: Date.now(),
      content: comment.trim(),
      author: currentUser.name,
      createdAt: new Date().toISOString(),
    }
    const updated = [newComment, ...comments]
    setComments(updated)
    localStorage.setItem(`buildfolio_comments_${id}`, JSON.stringify(updated))
    setComment('')
  }

  if (!project) {
    return (
      <div className='bg-gray-50 min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 max-w-4xl mx-auto px-4 py-12 w-full'>
          <p className='text-sm text-gray-500'>Project not found.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-4xl mx-auto px-4 py-12 w-full'>
        {/* Back */}
        <Link
          to='/'
          className='text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 inline-block'
        >
          ← Back to projects
        </Link>

        {/* Project Header */}
        <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6'>
          <div className='flex items-start justify-between gap-4 mb-4'>
            <div className='flex-1'>
              <span className='text-xs bg-blue-50 text-primary border border-blue-100 px-2 py-0.5 rounded-md font-medium'>
                {project.category}
              </span>
              <h1 className='text-2xl font-semibold text-gray-900 mt-3 mb-2'>
                {project.title}
              </h1>
              <p className='text-sm text-gray-500 leading-relaxed'>
                {project.description}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className='flex flex-wrap gap-1.5 mb-4'>
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className='flex items-center gap-2 mb-6'>
            <img
              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${project.author}`}
              className='w-6 h-6 rounded-full border border-gray-200'
              alt={project.author}
            />
            <span className='text-xs text-gray-500'>{project.author}</span>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
            {/* Like */}
            <button
              onClick={handleLike}
              className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors'
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
              {project.likes} likes
            </button>

            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                isBookmarked
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={isBookmarked ? 'currentColor' : 'none'}
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
              </svg>
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>

            {/* Links */}
            <div className='flex items-center gap-3 ml-auto'>
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
                >
                  GitHub →
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sm text-primary hover:text-primary-hover transition-colors'
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className='bg-white border border-gray-200 rounded-xl p-6'>
          <h2 className='text-base font-semibold text-gray-900 mb-4'>
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          {currentUser ? (
            <form onSubmit={handleAddComment} className='mb-6'>
              <div className='flex items-start gap-3'>
                <img
                  src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${currentUser.email}`}
                  className='w-7 h-7 rounded-full border border-gray-200 shrink-0'
                  alt={currentUser.name}
                />
                <div className='flex-1'>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Write a comment...'
                    className='w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none'
                  />
                  <button
                    type='submit'
                    className='mt-2 bg-primary hover:bg-primary-hover text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors'
                  >
                    Post comment
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className='text-sm text-gray-500 mb-6'>
              <Link
                to='/login'
                className='text-primary hover:text-primary-hover transition-colors'
              >
                Log in
              </Link>{' '}
              to leave a comment.
            </p>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className='text-sm text-gray-400 text-center py-6'>
              No comments yet. Be the first to comment.
            </p>
          ) : (
            <div className='flex flex-col gap-4'>
              {comments.map((c) => (
                <div key={c.id} className='flex items-start gap-3'>
                  <img
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${c.author}`}
                    className='w-7 h-7 rounded-full border border-gray-200 shrink-0'
                    alt={c.author}
                  />
                  <div className='flex-1 bg-gray-50 rounded-lg px-3 py-2'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='text-xs font-medium text-gray-900'>
                        {c.author}
                      </span>
                      <span className='text-xs text-gray-400'>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-sm text-gray-700'>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetailPage
