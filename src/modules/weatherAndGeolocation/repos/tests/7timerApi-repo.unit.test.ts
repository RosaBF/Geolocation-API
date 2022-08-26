import { IWeatherApiQueryDTO } from './../../dto/7timer-api-query.dto';

import axios from 'axios';
import { WeatherApiRepo } from './../7timerApi-repo';

describe('#modules#weatherAndGeolocation#weatherApiRepo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#getWeather', () => {
    it('should return null if there is not weather data found', async () => {
      const repo = new WeatherApiRepo();
      const getMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

      const query: IWeatherApiQueryDTO = {
        lat: '__LATITUDE__',
        lon: '__LONGITUDE__',
      };

      const ret = await repo.getWeather(query);

      expect(ret).toBeNull();
      expect(getMock.mock.calls).toEqual([
        {
          cloudcover: 890,
          temperature: 46764,
          humidity: '__HUMIDITY__',
          weather: '__WEATHER__',
        },
      ]);
    });
    it('should return latitude and longitude coordinates ', async () => {
      const repo = new WeatherApiRepo();

      const getMock = jest.spyOn(axios, 'get').mockResolvedValue({
        data: [
          {
            place_id: 84848848,
            licence: '__LICENCE__',
            osm_type: '__OSM_TYPE__',
            osm_id: 9898909,
            boundingbox: ['__BOUNDINGBOX__', '__BOUNDINGBOX__'],
            lat: '__LATITUDE__',
            lon: '__LONGITUDE__',
          },
        ],
      });

      const query: IWeatherApiQueryDTO = {
        lat: '__LATITUDE__',
        lon: '__LONGITUDE__',
      };

      const ret = await repo.getWeather(query);

      expect(ret).toEqual({
        addressCoordinates: {
          lat: '__LATITUDE__',
          lon: '__LONGITUDE__',
        },
      });
      expect(getMock.mock.calls).toEqual([
        [
          {
            cloudcover: 890,
            temperature: 46764,
            humidity: '__HUMIDITY__',
            weather: '__WEATHER__',
          },
        ],
      ]);
    });
  });
});
