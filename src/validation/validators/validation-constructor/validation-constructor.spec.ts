import { RequiredFieldValidation, ValidationConstructor as sut, EmailValidation } from ".."
import { MinLengthValidator } from "../min-length/min-length"
import faker from 'faker'

describe('ValidationConstructor', () => {

  test('Should return Required Field Validation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).minLength(5).build()
    expect(validations).toEqual([new MinLengthValidator(field, 5)])
  })

  test('Should return a list with all possible validators', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().required().minLength(5).build()
    expect(validations).toEqual([
      new EmailValidation(field),
      new RequiredFieldValidation(field),
      new MinLengthValidator(field, 5)
    ])
  })
})