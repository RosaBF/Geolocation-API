import config from '../../../../config';
import axios from 'axios';
import { IWeather } from '../domain';
import { IWeatherRepo } from './weather.repo';
import { IWeatherApiQueryDTO } from '../dto';

export class WeatherApiRepo implements IWeatherRepo {
  public async getWeather(
    query: IWeatherApiQueryDTO
  ): Promise<IWeather | null> {
    const urlBase = `http://www.7timer.info/bin/api.pl?lon=${query.lon}&lat=${query.lat}&product=civil&output=json`;

    const response = await axios.get<IWeather[]>(urlBase);

    if (!response.data.length) {
      return null;
    }

    const weather = response.data[0];

    return weather;
  }
}
