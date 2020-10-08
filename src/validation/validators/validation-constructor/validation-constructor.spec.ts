import { RequiredFieldValidation, ValidationConstructor as sut } from ".."

describe('ValidationConstructor', () => {
  test('Should return Required Field Validation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})