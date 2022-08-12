import { query, Request, Response } from 'express';
import { IAddressQueryDTO } from '../../../validateAddressIsReal/dto';
import { AddressErrors } from '../../../validateAddressIsReal/useCases/validateAddress/errors';
import { IAddressDTO } from '../../dto';
import { IWeatherApiQueryDTO } from './../../dto/7timer-api-query.dto';
import { weatherNotFoundError } from './errors';
import { GetWeatherCoordinatesFromAddressUseCase } from './getWeather-longitude-latitude-of-address.use-case';

export class GetWeatherCoordinatesFromAddressController {
  private getWeatherCoordinatesFromAddressUseCase: GetWeatherCoordinatesFromAddressUseCase;

  constructor(
    getWeatherCoordinatesFromAddressUseCase: GetWeatherCoordinatesFromAddressUseCase
  ) {
    this.getWeatherCoordinatesFromAddressUseCase =
      getWeatherCoordinatesFromAddressUseCase;
  }

  public async execute(req: Request, res: Response) {
    
    const query = {
      weatherParams: {
        lat: req.body.lat,
        lon: req.body.lon,
      },

      addressParams: {
        street: req.query.street as string,
        streetName: req.query.streetName as string,
        city: req.query.city as string,
        postalCode: req.query.postalCode as string,
        country: req.query.country as string,
      },
    };
    try {
      const useCaseResponse =
        await this.getWeatherCoordinatesFromAddressUseCase.execute(
          query.addressParams,
          query.weatherParams
        );
      res.send(useCaseResponse);
    } catch (error: any) {
      switch (error.constructor) {
        case weatherNotFoundError:
          res.status(404).send({ message: error.message });
          break;
        case AddressErrors.AddressNotFound:
          res.status(404).send({ message: error.message });
          break;
        case AddressErrors.AddressInvalid:
          res.status(403).send({ message: error.message });
          break;
        default:
          res.sendStatus(500);
      }
    }
  }
}
