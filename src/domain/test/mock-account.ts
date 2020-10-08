import { TaccountModel } from "../models";
import { TauthenticationParams } from "../usecases"
import faker from 'faker'

export const mockAuthentication = (): TauthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccountModel = (): TaccountModel => ({
  accessToken: faker.random.uuid()
});