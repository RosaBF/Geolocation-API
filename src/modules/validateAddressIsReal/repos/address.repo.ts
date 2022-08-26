import { IAddressCoordinates } from '../domain/addressCoordinates.entity';
import { IAddressQueryDTO } from './../dto/address.dto';


export interface IAddressRepo {
  getAddress(query: IAddressQueryDTO): Promise<IAddressCoordinates | null>;
}
