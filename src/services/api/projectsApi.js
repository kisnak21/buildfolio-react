import realApiClient from './realApiClient.js'

const normalizeProject = (p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  description: p.description,
  thumbnail: p.thumbnail || null,
  github: p.github_url || p.github || '#',
  live: p.live_url || p.live || '#',
  category: p.category_name || p.category || '',
  technologies: Array.isArray(p.technologies) ? p.technologies : [],
  author: p.author_name || p.author || '',
  likes: p.likes || 0,
  user_id: p.user_id || null,
  category_id: p.category_id || null,
  createdAt: p.created_at || p.createdAt || null,
})

export const getProjects = async () => {
  const response = await realApiClient.get('/projects')
  return response.data.data.map(normalizeProject)
}

export const createProject = async (project) => {
  const response = await realApiClient.post('/projects', {
    title: project.title,
    slug: project.slug,
    description: project.description,
    thumbnail: project.thumbnail || null,
    github_url: project.github || project.github_url || null,
    live_url: project.live || project.live_url || null,
    user_id: project.user_id,
    category_id: project.category_id || null,
  })
  return normalizeProject(response.data.data)
}

export const updateProject = async (id, updatedFields) => {
  const response = await realApiClient.patch(`/projects/${id}`, {
    title: updatedFields.title,
    slug: updatedFields.slug,
    description: updatedFields.description,
    thumbnail: updatedFields.thumbnail,
    github_url: updatedFields.github || updatedFields.github_url,
    live_url: updatedFields.live || updatedFields.live_url,
    category_id: updatedFields.category_id,
    likes: updatedFields.likes,
  })
  return normalizeProject(response.data.data)
}

export const deleteProject = async (id) => {
  await realApiClient.delete(`/projects/${id}`)
  return id
}
