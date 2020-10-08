import { IfieldValidation } from "@/validation/protocols";

export class FieldValidationSpy implements IfieldValidation {
  error: Error = null
  
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return this.error
  }
}