import { NominatinGeoLocationRepo } from './../../../validateAddressIsReal/repos/nominatin.address-repo';
import { GetWeatherCoordinatesFromAddressUseCase } from './getWeather-longitude-latitude-of-address.use-case';
import { WeatherApiRepo } from "../../repos/7timerApi-repo";
import { LoginUserUseCase } from '../../../user/useCases/loginUser/login-user.use-case';
import { MongoUserRepo } from '../../../user/repos';




const weatherRepo = new WeatherApiRepo();
const addressRepo = new NominatinGeoLocationRepo(); 
const userRepo = new MongoUserRepo
const loginUsecase = new LoginUserUseCase(userRepo)
// const useCase = new GetWeatherCoordinatesFromAddressUseCase(weatherRepo, addressRepo, userRepo,loginUsecase )