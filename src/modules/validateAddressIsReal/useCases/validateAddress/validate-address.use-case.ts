import { IAddressQueryDTO } from './../../dto/address.dto';
import { IAddressCoordinates } from '../../domain/addressCoordinates.entity';
import { IAddressRepo } from '../../repos/address.repo';
import { AddressErrors } from './errors/address.erros';

export interface IGetAddresValidatedUseCase {
  execute(query: IAddressQueryDTO): Promise<IAddressCoordinates>;
}

export class GetValidateAddressUseCase implements IGetAddresValidatedUseCase {
  addressRepo: IAddressRepo;

  constructor(addressRepo: IAddressRepo) {
    this.addressRepo = addressRepo;
  }

  public async execute(query: IAddressQueryDTO): Promise<IAddressCoordinates> {
    const address = await this.addressRepo.getAddress(query);

    if (!address) {
      throw new AddressErrors.AddressNotFound();
    }

    return address;
  }
}
