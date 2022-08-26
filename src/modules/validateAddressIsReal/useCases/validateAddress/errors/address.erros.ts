import { ApplicationError } from './aplication.error';

export namespace AddressErrors {
  export class AddressInvalid extends ApplicationError {
    constructor() {
      super('The address is invalid');
    }
  }

  export class AddressNotFound extends ApplicationError {
    constructor() {
      super('Address not Found');
    }
  }
}
