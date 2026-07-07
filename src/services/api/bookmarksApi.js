import realApiClient from './realApiClient.js'

export const getUserBookmarks = async (userId) => {
  const response = await realApiClient.get(`/bookmarks?userId=${userId}`)
  return response.data.data
}

export const addBookmark = async ({ user_id, project_id }) => {
  const response = await realApiClient.post('/bookmarks', {
    user_id,
    project_id,
  })
  return response.data.data
}

export const removeBookmark = async (id) => {
  await realApiClient.delete(`/bookmarks/${id}`)
  return id
}
