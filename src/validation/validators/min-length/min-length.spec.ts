import { MinLengthValidator } from './min-length'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

const makeSut = (): MinLengthValidator => new MinLengthValidator(faker.database.column(), 5)

describe('MinLengthValidator', () => {
  test('Should return an error if input length is lower than 5', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError)
  })

  test('Should return an error if input length is lower than 5', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
  
})