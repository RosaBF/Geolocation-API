import axios from 'axios';
import { IAddressRepo } from './address.repo';
import { IAddressValidated } from '../domain/addressValidated.entity';
import { IAddressQueryDTO, INominatinApiResponseDTO } from '../dto';

export class NominatinGeoLocationRepo implements IAddressRepo {
  public async getAddress(
    query: IAddressQueryDTO
  ): Promise<IAddressValidated | null> {
    const urlBase = `https://nominatim.openstreetmap.org/search?street=${query.street}&streetname=${query.streetName}&city=${query.city}&county=${query.country}&postalCode=${query.postalCode}&format=json&limit=1`;

    const response = await axios.get<INominatinApiResponseDTO[]>(urlBase);

    if (!response.data.length) {
      return null;
    }

    const dataResponse: IAddressValidated = {
      address: { lat: response.data[0].lat, lon: response.data[0].lon },
    };

    // const address: IAddressDTO = {
    //   street: query.street,
    //   streetName: query.streetName,
    //   city: query.city,
    //   postalCode: query.postalCode,
    //   country: query.country,

    // };

    return dataResponse;
  }
}
