import { RequiredFieldError } from "@/validation/errors";
import { IfieldValidation } from "@/validation/protocols";

export class RequiredFieldValidation implements IfieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}