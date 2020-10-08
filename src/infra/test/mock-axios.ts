import axios from 'axios'
import faker from 'faker'

export const mockPostAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  const mockedAxiosPostResponse = {
    data: faker.random.objectElement(),
    status: faker.random.number()
  }

  mockedAxios.post.mockResolvedValue(mockedAxiosPostResponse)
  
  return {mockedAxios}
  
}