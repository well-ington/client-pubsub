export interface IfieldValidation {
  field: string
  validate: (input: object | string) => Error
  error?: Error | null
}