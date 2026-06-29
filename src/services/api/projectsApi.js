import axiosClient from './axiosClient'

const RESOURCE = '/projects'

export const getProjects = async () => {
  const response = await axiosClient.get(RESOURCE)
  return response.data
}

export const createProject = async (project) => {
  const response = await axiosClient.post(RESOURCE, project)
  return response.data
}

export const updateProject = async (id, updatedFields) => {
  const response = await axiosClient.put(`${RESOURCE}/${id}`, updatedFields)
  return response.data
}

export const deleteProject = async (id) => {
  await axiosClient.delete(`${RESOURCE}/${id}`)
  return id
}
