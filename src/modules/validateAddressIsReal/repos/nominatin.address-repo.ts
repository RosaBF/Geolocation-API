import { IAddressDTO } from './../dto/address.dto';
import axios from 'axios';
import { IAddressRepo } from './address.repo';
import { IAddressValidated } from '../domain/addressValidated.entity';
import config from '../../../../config';

export class NominatinGeoLocationRepo implements IAddressRepo {
  public async getAddress(
    query: IAddressDTO
  ): Promise<IAddressValidated | null> {
    const queryParams: IAddressDTO = {
      street: query.street,
      city: query.city,
      country: query.country,
      postalCode: query.postalCode,
      streetNumber: query.streetNumber,
    };

    const urlBase = `${config.NOMINATIN_URL}${queryParams}&format=json&limit=1`;

    const response = await axios.get(urlBase);

    if (!response.data.length) {
      return null;
    }

    const addressResponse = response.data[0];

    const address: IAddressDTO = {
      street: addressResponse.street,
      streetNumber: addressResponse.streetNumber,
      city: addressResponse.city,
      country: addressResponse.country,
      postalCode: addressResponse.postalCode,
      lat: addressResponse.lat,
      lon: addressResponse.lon,
    };

    const addressValidated: IAddressValidated = { address: address };

    return addressValidated;
  }
}
