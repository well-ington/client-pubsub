import { IfieldValidation } from "@/validation/protocols"
import { FieldValidationSpy } from "@/validation/test/mock-validation-field"
import { ValidatorComposite } from "./validator-composite"
import faker from 'faker'

type SutTypes = {
  sut: ValidatorComposite
  fieldValidationsSpy: IfieldValidation[] | any[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')    
  ]

  const sut = ValidatorComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}


describe('ValidationComposite test', () => {

  test('Should return error if validation fails', () => {
    const {sut, fieldValidationsSpy} = makeSut()
    const errMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate('any_field', faker.random.words())
    expect(error).toBe(errMessage)
  })


   test('Should return falsy if there is no error', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_field', faker.random.words())
    expect(error).toBeFalsy()
  })

})