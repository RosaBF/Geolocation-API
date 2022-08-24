import { IWeatherApiQueryDTO } from './../../dto/7timer-api-query.dto';
import { IWeather } from './../../domain/weather.entity';
import { NominatinGeoLocationRepo } from '../../../validateAddressIsReal/repos';
import { AddressErrors } from '../../../validateAddressIsReal/useCases/validateAddress/errors';
import { IWeatherRepo } from '../../repos/weather.repo';
import {
  IAddressDTO,
  IAddressQueryDTO,
} from '../../../validateAddressIsReal/dto';

export interface IGetWeatherCoordinatesFromAddress {
  execute(
    query: IAddressQueryDTO,
    coordinates: IWeatherApiQueryDTO
  ): Promise<IWeather | null>;
}

export class GetWeatherCoordinatesFromAddressUseCase
  implements IGetWeatherCoordinatesFromAddress
{
  addressRepo: NominatinGeoLocationRepo;
  weatherRepo: IWeatherRepo;

  constructor(
    addressRepo: NominatinGeoLocationRepo,
    weatherRepo: IWeatherRepo
  ) {
    this.addressRepo = addressRepo;
    this.weatherRepo = weatherRepo;
  }

  public async execute(
    coordinates: IAddressQueryDTO,
    weather: IWeatherApiQueryDTO
  ): Promise<IWeather | null> {
    // const address = await this.addressRepo.getAddress(query);

    if (!coordinates) {
      throw new AddressErrors.AddressNotFound();
    }
    const weatherResponse = await this.weatherRepo.getWeather(weather);

    // const weatherCoordinates: IWeatherApiQueryDTO = {
    //   lat: coordinates.lat,
    //   lon: coordinates.lon,
    // };

    // const weatherCheckedWithLatandLonOfAddress =
    //   locationCoordinates === weatherCoordinates ? weather : null;

    return weatherResponse;
  }
}
