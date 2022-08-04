import { ApplicationError } from './aplication.error';
import { IAddressDTO } from '../../dto';


export namespace AddressErrors {
  export class AddressInvalid extends ApplicationError {
    constructor() {
      super('The address is invalid');
    }
  }
    
    export class AddressNotFound extends ApplicationError {
        constructor() {
          super('Addess not Found')
      }
   }
}
