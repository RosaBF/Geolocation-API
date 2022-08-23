import { query, Request, Response } from 'express';
import { AddressErrors } from '../../../validateAddressIsReal/useCases/validateAddress/errors';
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
      addressParams: {
        street: req.query.street as string,
        streetNumber: req.query.streetName as string,
        city: req.query.city as string,
        postalCode: req.query.postalCode as string,
        country: req.query.country as string,
      },

      weatherParams: {
        lat: req.body.lat,
        lon: req.body.lon,
      },
    };
    try {
      const useCaseResponse =
        await this.getWeatherCoordinatesFromAddressUseCase.execute(
          query.addressParams,
          query.weatherParams
        );

      res.send(useCaseResponse);

      console.log('hhhhhhhhhhhhhhhhhhhh', useCaseResponse);
    } catch (error: any) {
      switch (error.constructor) {
        case AddressErrors.AddressNotFound:
          res.status(404).send({ message: error.message });
          break;
        case AddressErrors.AddressInvalid:
          res.status(403).send({ message: error.message });
          break;
        case weatherNotFoundError:
          res.status(404).send({ message: error.message });
          break;

        default:
          res.sendStatus(500);
      }
    }
  }
}
