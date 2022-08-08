import { IWeatherApiQueryDTO } from '../dto/7timer-api-query.dto';
import { IWeather } from '../domain';


export interface IWeatherRepo {
  getWeather(query: IWeatherApiQueryDTO): Promise<IWeather | null>;
}
