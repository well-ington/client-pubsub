export class UnexpectedError extends Error {
  constructor() {
    super('Ops! Something went wrong. Try again later.')
    this.name = 'UnexpectedError'
  }
}