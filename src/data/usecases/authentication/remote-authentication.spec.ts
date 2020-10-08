import { mockAuthentication, mockAccountModel } from "@/domain/test/mock-account"
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { InvalidCredentialsError, UnexpectedError} from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { TauthenticationParams } from '@/domain/usecases/authentication';
import { TaccountModel } from '@/domain/models/account-model';
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy<TauthenticationParams, TaccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<TauthenticationParams, TaccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const {sut, httpPostClientSpy} = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const response = sut.auth(mockAuthentication())
    expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw Unexpected Error if HttpPostClient returns 400', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const response = sut.auth(mockAuthentication())
    expect(response).rejects.toThrow(new UnexpectedError())
  })

   test('Should throw Unexpected Error if HttpPostClient returns 404', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const response = sut.auth(mockAuthentication())
    expect(response).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw Unexpected Error if HttpPostClient returns 500', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const response = sut.auth(mockAuthentication())
    expect(response).rejects.toThrow(new UnexpectedError())
  })

  test('Should return AccountModel if HttpPostClient returns 200', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})