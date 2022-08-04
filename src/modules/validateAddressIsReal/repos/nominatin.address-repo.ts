import { IAddressDTO } from './../dto/address.dto';
import axios from 'axios';
import { IAddressRepo } from './address.repo';

export class NominatinGeoLocationRepo implements IAddressRepo {
  public url: string;

  constructor(_url: string) {
    this.url = process.env.NOMINATIN_URL || '';
  }

  async findOne(
    street: string,
    streetNumber: string,
    town: string,
    postalCode: string,
    country: string
  ): Promise<IAddressDTO | null> {
    const urlBase = `${this.url}/search`;
    const queryParams = {
      street: `${streetNumber} ${street}`,
      city: town,
      country: country,
      postalcode: postalCode,
      format: 'json',
      limit: 1,
    };

    const response = await axios.get(urlBase, {
      params: queryParams,
    });

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

    return address;
  }
}
