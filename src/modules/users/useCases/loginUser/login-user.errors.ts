export namespace LoginUserErrors {
  export class userNotfound extends Error {
    constructor(email: string) {
      super(`User ${email} not found`);
    }
  }

  export class passwordInvalid extends Error {
    constructor() {
      super(`Invalid credentials`);
    }
  }
}
