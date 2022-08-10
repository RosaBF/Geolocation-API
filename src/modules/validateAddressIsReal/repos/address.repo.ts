
import { IAddressValidated } from '../domain/addressValidated.entity';
import { IAddressDTO } from '../dto';

export interface IAddressRepo {
  getAddress(query: IAddressDTO): Promise<IAddressValidated | null>;
}
