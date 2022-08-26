import { IAddressQueryDTO } from './../../../validateAddressIsReal/dto/address.dto';
import { Request, Response } from 'express';
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
    const query: IAddressQueryDTO = {
      lat: req.query.lat as string,
      lon: req.query.lon as string,
    };
    try {
      const useCaseResponse =
        await this.getWeatherCoordinatesFromAddressUseCase.execute(query);

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
