import { IfieldValidation } from "@/validation/protocols"
import { InvalidFieldError } from "@/validation/errors"

export class MinLengthValidator implements IfieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }

}