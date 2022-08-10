
import { IWeather } from '../domain';
import { IWeatherApiQueryDTO } from '../dto';

export interface IWeatherRepo {
  getWeather(query: IWeatherApiQueryDTO): Promise<IWeather | null>;
  //getLocationCoordinates(query: IAddressDTO): Promise<ICoordinates| null>
}
