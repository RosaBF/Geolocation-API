import { IAddressCoordinates } from '../../../validateAddressIsReal/domain/addressCoordinates.entity';
import { WeatherApiRepo } from '../../repos/7timerApi-repo';
import { IWeatherApiQueryDTO } from './../../dto/7timer-api-query.dto';
import { IWeather } from './../../domain/weather.entity';
import { NominatinGeoLocationRepo } from '../../../validateAddressIsReal/repos';
import { AddressErrors } from '../../../validateAddressIsReal/useCases/validateAddress/errors';
import { IAddressQueryDTO } from '../../../validateAddressIsReal/dto';

export interface IGetWeatherCoordinatesFromAddress {
  execute(addressCoordinates: IAddressQueryDTO): Promise<IWeather | null>;
}

export class GetWeatherCoordinatesFromAddressUseCase
  implements IGetWeatherCoordinatesFromAddress
{
  addressRepo: NominatinGeoLocationRepo;
  weatherRepo: WeatherApiRepo;

  constructor(
    addressRepo: NominatinGeoLocationRepo,
    weatherRepo: WeatherApiRepo
  ) {
    this.addressRepo = addressRepo;
    this.weatherRepo = weatherRepo;
  }

  public async execute(address: IAddressQueryDTO): Promise<IWeather | null> {
    const addressCoordinates = await this.addressRepo.getAddress(address);

    const result: IWeatherApiQueryDTO = {
      lat: addressCoordinates?.lat,
      lon: addressCoordinates?.lon,
    };
    const weatherResponse = this.weatherRepo.getWeather(result);

    if (!addressCoordinates) {
      throw new AddressErrors.AddressNotFound();
    }
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', weatherResponse);
    return weatherResponse;
  }
}
