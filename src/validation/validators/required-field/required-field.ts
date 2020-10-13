import { RequiredFieldError } from "@/validation/errors";
import { IfieldValidation } from "@/validation/protocols";

export class RequiredFieldValidation implements IfieldValidation {
  constructor (readonly field: string) {}

  validate (input: string): Error {
    return input ? null : new RequiredFieldError()
  }
}