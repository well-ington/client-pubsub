import { IfieldValidation } from "@/validation/protocols/field-validation"
import { RequiredFieldValidation, EmailValidation } from ".."
import { MinLengthValidator } from "../min-length/min-length"

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

  minLength (stringLength: number): ValidationConstructor {
    this.validations.push(new MinLengthValidator(this.fieldName, stringLength))
    return this
  }

  build (): IfieldValidation[] {
    return this.validations
  }
}