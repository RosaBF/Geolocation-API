import { IAddressQueryDTO } from './../dto/address.dto';
import { IAddressValidated } from '../domain/addressValidated.entity';

export interface IAddressRepo {
  getAddress(query: IAddressQueryDTO): Promise<IAddressValidated | null>;
}
