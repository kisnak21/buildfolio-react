import realApiClient from './realApiClient.js'

export const registerUser = async ({ name, email, password }) => {
  const response = await realApiClient.post('/users', { name, email, password })
  return response.data.data
}

export const loginUserApi = async ({ email, password }) => {
  const response = await realApiClient.post('/users/login', { email, password })
  return response.data.data
}
