import { NominatinGeoLocationRepo } from './../../../validateAddressIsReal/repos/nominatin.address-repo';
import { GetWeatherCoordinatesFromAddressUseCase } from './getWeather-longitude-latitude-of-address.use-case';
import { WeatherApiRepo } from '../../repos/7timerApi-repo';
import { GetWeatherCoordinatesFromAddressController } from './getWeather-longitude-latitude-of-address.controller';

const weatherRepo = new WeatherApiRepo();
const addressRepo = new NominatinGeoLocationRepo();

const useCase = new GetWeatherCoordinatesFromAddressUseCase(
  addressRepo,
  weatherRepo
);
const getWeatherCoordinatesFromAddressController =
  new GetWeatherCoordinatesFromAddressController(useCase);

export { getWeatherCoordinatesFromAddressController };
