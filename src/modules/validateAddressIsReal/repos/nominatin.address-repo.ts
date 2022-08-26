import axios from 'axios';
import { IAddressRepo } from './address.repo';
import { IAddressCoordinates } from '../domain/addressCoordinates.entity';
import { IAddressQueryDTO, INominatinApiResponseDTO } from '../dto';

export class NominatinGeoLocationRepo implements IAddressRepo {
  public async getAddress(
    query: IAddressQueryDTO
  ): Promise<IAddressCoordinates | null> {
    const urlBase = `https://nominatim.openstreetmap.org/search?housenumber=${query.streetNumber}street=${query.street}&city=${query.city}&country=${query.country}&postalcode=${query.postalCode}&format=json&limit=1`;

    const response = await axios.get<INominatinApiResponseDTO[]>(urlBase);

    const dataResponse: IAddressCoordinates = {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };

    if (dataResponse) {
      response.status === 200;
    }

    if (!response.data.length) {
      return null;
    }

    return dataResponse;
  }
}
