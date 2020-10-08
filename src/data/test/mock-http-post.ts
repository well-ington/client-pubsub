import { ThttpPostParams } from "../protocols/http";
import faker from 'faker'

export const mockPostRequest = (): ThttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})