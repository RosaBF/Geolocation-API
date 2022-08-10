import { IWeatherApiQueryDTO } from './../../dto/7timer-api-query.dto';
import { IWeather } from './../../domain/weather.entity';
import { IAddressRepo } from '../../../validateAddressIsReal/repos';
import { AddressErrors } from '../../../validateAddressIsReal/useCases/validateAddress/errors';
import { IWeatherRepo } from '../../repos/weather.repo';
import { IAddressDTO } from '../../../validateAddressIsReal/dto';
import { IUsersRepo } from '../../../user/repos';
import { LoginUserUseCase } from '../../../user/useCases/loginUser/login-user.use-case';
import { ILoginUserDTO } from '../../../user/dto/login-user.dto';
import { LoginUserErrors } from '../../../user/useCases/loginUser/login-user.errors';

export interface IGetWeatherCoordinatesFromAddress {
  execute(
    query: IAddressDTO,
    coordinates: IWeatherApiQueryDTO
  ): Promise<IWeather | null>;
}

export class GetWeatherCoordinatesFromAddressUseCase
  implements IGetWeatherCoordinatesFromAddress
{
  addressRepo: IAddressRepo;
  weatherRepo: IWeatherRepo;
  usersUseCase: LoginUserUseCase;
  loginUser: ILoginUserDTO;

  constructor(
    addressRepo: IAddressRepo,
    weatherRepo: IWeatherRepo,
    usersUseCase: LoginUserUseCase,
    loginUser: ILoginUserDTO
  ) {
    this.addressRepo = addressRepo;
    this.weatherRepo = weatherRepo;
    this.usersUseCase = usersUseCase;
    this.loginUser = loginUser;
  }

  public async execute(
    query: IAddressDTO,
    coordinates: IWeatherApiQueryDTO
  ): Promise<IWeather | null> {
    const address = await this.addressRepo.getAddress(query);
    const weather = await this.weatherRepo.getWeather(coordinates);
    const userCredentals = await this.usersUseCase.execute(this.loginUser);

    if (!userCredentals) {
      throw new LoginUserErrors.passwordInvalid();
    }

    const weatherCoordinates: IWeatherApiQueryDTO = {
      lat: coordinates.lat,
      lon: coordinates.lon,
    };

    const locationCoordinates: IAddressDTO = {
      lat: query.lat,
      lon: query.lon,
      street: query.street,
      streetName: query.streetName,
      city: query.city,
      postalCode: query.postalCode,
      country: query.country,
    };

    if (!address) {
      throw new AddressErrors.AddressNotFound();
    }

    const weatherCheckedWithLatandLonOfAddress =
      locationCoordinates === weatherCoordinates ? weather : null;

    return weatherCheckedWithLatandLonOfAddress;
  }
}
