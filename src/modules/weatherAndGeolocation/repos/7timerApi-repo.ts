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

    if (!response.data[0].dataseries[0]) {
      return null;
    }

    if (response.data[0].dataseries[0]) {
      response.status === 200;
    }

    const weatherResponse: IWeather = {
      cloudcover: response.data[0].dataseries[0].cloudcover,
      temperature: response.data[0].dataseries[0].temp2m,
      humidity: response.data[0].dataseries[0].rh2m,
      weather: response.data[0].dataseries[0].weather,
    };

    console.log('uuuuuuuuuuuuuuuuuu', weatherResponse);
    return weatherResponse;
  }
}
