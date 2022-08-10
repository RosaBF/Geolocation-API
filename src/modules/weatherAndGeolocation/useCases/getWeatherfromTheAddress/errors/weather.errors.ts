export class weatherNotFoundError extends Error {
  constructor() {
    super('Weather not found');
  }
}
