import { IAddressDTO } from '../dto';
import { IAddressRepo } from '../../validateAddressIsReal/repos/address.repo';
import { AddressErrors } from '../repos/errors/address.erros';

export class ValidateAddressUseCase {
  addressRepo: IAddressRepo;

  constructor(addressRepo: IAddressRepo) {
    this.addressRepo = addressRepo;
  }

  async validateAddress(
    street: string,
    streetNumber: string,
    town: string,
    postalCode: string,
    country: string
  ): Promise<IAddressDTO | null> {
    const address: IAddressDTO | null = await this.addressRepo.findOne(
      street,
      streetNumber,
      town,
      postalCode,
      country
    );
    if (!address) {
      throw new AddressErrors.AddressInvalid();
    }

    return address;
  }
}
