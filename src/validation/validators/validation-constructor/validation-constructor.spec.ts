import { RequiredFieldValidation, ValidationConstructor as sut, EmailValidation } from ".."

describe('ValidationConstructor', () => {

  test('Should return Required Field Validation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  // test('Should return EmailValidation', () => {
  //   const validations = sut.field('any_field').minLength().build()
  //   expect(validations).toEqual([new EmailValidation('any_field')])
  // })
})