import { IAddressQueryDTO } from './../../dto/address.dto';
import { IAddressValidated } from '../../domain/addressValidated.entity';
import { IAddressDTO } from '../../dto';
import { IAddressRepo } from '../../repos/address.repo';
import { AddressErrors } from './errors/address.erros';

export interface IGetAddresValidatedUseCase {
  execute(query: IAddressDTO): Promise<IAddressValidated>;
}

export class GetValidateAddressUseCase implements IGetAddresValidatedUseCase {
  addressRepo: IAddressRepo;

  constructor(addressRepo: IAddressRepo) {
    this.addressRepo = addressRepo;
  }

  public async execute(query: IAddressQueryDTO): Promise<IAddressValidated> {
    const address = await this.addressRepo.getAddress(query);

    if (!address) {
      throw new AddressErrors.AddressNotFound();
    }

    return address;
  }
}
