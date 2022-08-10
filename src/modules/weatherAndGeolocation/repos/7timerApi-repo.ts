import { IWeatherApiResponse } from './../dto/7timer-api-response.dto';
import axios from 'axios';
import { IWeather } from '../domain';
import { IWeatherRepo } from './weather.repo';
import { IWeatherApiQueryDTO } from '../dto';

export class WeatherApiRepo implements IWeatherRepo {
  public async getWeather(
    query: IWeatherApiQueryDTO
  ): Promise<IWeather | null> {
    const urlBase = `http://www.7timer.info/bin/api.pl?lon=${query.lon}&lat=${query.lat}&product=civil&output=json`;

    const response = await axios.get<IWeatherApiResponse[]>(urlBase);

    if (!response.data) {
      return null;
    }

    const data = response.data[0];

    const weatherData: IWeather = {
      cloudCover: query.cloudCover as number,
      temperature: query.temperature as number,
      humidity: query.humidity as string,
      weather: query.weather as string,
    };

    return weatherData;
  }
}
