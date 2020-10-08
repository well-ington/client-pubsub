import { Ivalidation } from '@/presentation/protocols'
import { IfieldValidation } from '@/validation/protocols/field-validation'

export class ValidatorComposite implements Ivalidation {
  constructor (private readonly validators: IfieldValidation[]) {}

  static build (validators: IfieldValidation[]): ValidatorComposite {
    return new ValidatorComposite(validators)
  }

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const valid of validators) {
      const error = valid.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
    return null
  }
}