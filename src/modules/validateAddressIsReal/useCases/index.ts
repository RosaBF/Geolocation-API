import { GetValidateAddressUseCase } from './validateAddress/validate-address.use-case';
import { NominatinGeoLocationRepo } from '../repos';
import { IGetAddressValidatedController } from './validateAddress/validate-address.controller';

const repo = new NominatinGeoLocationRepo();
const usecase = new GetValidateAddressUseCase(repo);
const getAddressValidatedController = new IGetAddressValidatedController(
  usecase
);

export { getAddressValidatedController };
