import { IfieldValidation } from "@/validation/protocols/field-validation"
import { RequiredFieldValidation, EmailValidation } from ".."

export class ValidationConstructor {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: IfieldValidation[]
    ) {}

  static field (fieldName: string): ValidationConstructor {
    return new ValidationConstructor(fieldName, [])
  }

  required (): ValidationConstructor {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationConstructor {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build (): IfieldValidation[] {
    return this.validations
  }
}