import { IAddressValidated } from '../domain/addressValidated.entity';
import { IAddressDTO } from '../dto';
import { INominatinApiResponseDTO } from '../dto';

export interface IAddressRepo {
  findOne(
    street: string,
    streetNumber: string,
    town: string,
    postalCode: string,
    country: string
  ): Promise<IAddressDTO | null>;
}


