import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

import faker from 'faker'

//test factory
const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation test', () => {
  test('Should return an error if email field is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({[field]: faker.random.word()})

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Ensures error is false/null when email is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({[field]: faker.internet.email()})

    expect(error).toBeFalsy()
  })

  test('Ensures error is false/null when email is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({[field]: ''})

    expect(error).toBeFalsy()
  })
})