import axiosClient from './axiosClient'

const RESOURCE = '/users'

export const getUsers = async () => {
  const response = await axiosClient.get(RESOURCE)
  return response.data
}

export const createUser = async (user) => {
  const response = await axiosClient.post(RESOURCE, user)
  return response.data
}
