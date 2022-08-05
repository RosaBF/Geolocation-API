export class ApplicationError extends Error {
  public message: string;

  constructor(message: string) {
    const superMessage = message;

    super(superMessage);

    this.message = message;
  }
}
