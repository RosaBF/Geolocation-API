import { IAddressDTO, IAddressQueryDTO } from './../dto/address.dto';
import axios from 'axios';
import { IAddressRepo } from './address.repo';
import { IAddressValidated } from '../domain/addressValidated.entity';
import { INominatinApiResponseDTO } from '../dto';

export class NominatinGeoLocationRepo implements IAddressRepo {
  public async getAddress(
    query: IAddressQueryDTO
  ): Promise<IAddressValidated | null> {
    const urlBase = `https://nominatim.openstreetmap.org/search?street=${query.street}&streetname=${query.streetName}&city=${query.city}&county=${query.country}&postalCode=${query.postalCode}&format=json&limit=1`;

    const response = await axios.get<INominatinApiResponseDTO[]>(urlBase);

    if (!response.data.length) {
      return null;
    }

    const dataResponse = response.data[0];

    const address: IAddressDTO = {
      street: query.street,
      streetName: query.streetName,
      city: query.city,
      postalCode: query.postalCode,
      country: query.country,
    };

    const addressValidated: IAddressValidated = { address: address };

    return addressValidated;
  }
}
