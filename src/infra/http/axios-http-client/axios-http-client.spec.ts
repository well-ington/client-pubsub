import { AxiosHttpClient } from './axios-http-client'
import { mockPostAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test/'
import axios from 'axios'

jest.mock('axios')

type TSutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): TSutTypes => {
  const sut = new AxiosHttpClient()
  const {mockedAxios} = mockPostAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {

  test('Should call Axios with correct values and verb', async () => {
    const {sut, mockedAxios} = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should call Axios returns the correct statusCode and body', async () => {
    const {sut, mockedAxios} = makeSut()
    const promise = await sut.post(mockPostRequest())
    const mockedResolvedValue = await mockedAxios.post.mock.results[1].value
    expect(promise).toEqual({body: mockedResolvedValue.data, statusCode: mockedResolvedValue.status})
  })

})