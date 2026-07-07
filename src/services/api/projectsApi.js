import realApiClient from './realApiClient.js'

export const getProjects = async () => {
  const response = await realApiClient.get('/projects')
  return response.data.data
}

export const createProject = async (project) => {
  const response = await realApiClient.post('/projects', project)
  return response.data.data
}

export const updateProject = async (id, updatedFields) => {
  const response = await realApiClient.patch(`/projects/${id}`, updatedFields)
  return response.data.data
}

export const deleteProject = async (id) => {
  await realApiClient.delete(`/projects/${id}`)
  return id
}
