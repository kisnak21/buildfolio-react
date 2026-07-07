import realApiClient from './realApiClient.js'

export const getProjectComments = async (projectId) => {
  const response = await realApiClient.get(`/comments?projectId=${projectId}`)
  return response.data.data
}

export const addComment = async ({ content, user_id, project_id }) => {
  const response = await realApiClient.post('/comments', {
    content,
    user_id,
    project_id,
  })
  return response.data.data
}

export const deleteComment = async (id) => {
  await realApiClient.delete(`/comments/${id}`)
  return id
}
