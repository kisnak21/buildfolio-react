import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'

const ProjectTable = ({ projects, onDelete }) => {
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleConfirmDelete = () => {
    onDelete(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='text-left font-medium text-gray-500 px-4 py-3'>Title</th>
              <th className='text-left font-medium text-gray-500 px-4 py-3'>Category</th>
              <th className='text-left font-medium text-gray-500 px-4 py-3'>Likes</th>
              <th className='text-right font-medium text-gray-500 px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className='border-b border-gray-100 last:border-0'>
                <td className='px-4 py-3 font-medium text-gray-900'>{project.title}</td>
                <td className='px-4 py-3'>
                  <span className='text-xs bg-blue-50 text-primary border border-blue-100 px-2 py-0.5 rounded-md font-medium'>
                    {project.category}
                  </span>
                </td>
                <td className='px-4 py-3 text-gray-500'>{project.likes}</td>
                <td className='px-4 py-3 text-right'>
                  <Link
                    to={`/projects/edit/${project.id}`}
                    className='text-primary hover:text-primary-hover transition-colors mr-4'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className='text-red-600 hover:text-red-700 transition-colors'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <p className='text-center text-sm text-gray-400 py-10'>
            No projects yet. Create your first one.
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title='Delete project?'
        message={`This will permanently remove "${deleteTarget?.title}". This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default ProjectTable