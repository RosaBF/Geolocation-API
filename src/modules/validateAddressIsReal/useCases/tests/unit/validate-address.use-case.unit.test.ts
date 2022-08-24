import { GetValidateAddressUseCase } from '../../validateAddress/validate-address.use-case';
import { NominatinGeoLocationRepo } from '../../../repos/nominatin.address-repo';
import { AddressErrors } from '../../validateAddress/errors';

describe('#modules#validateAddressIsReal#GGetValidateAddressUseCase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#execute', () => {
    it('should throw the error AddressNotFound if there are not locations', async () => {
      const repo = new NominatinGeoLocationRepo();
      const useCase = new GetValidateAddressUseCase(repo);

      const getAddressMock = jest
        .spyOn(repo, 'getAddress')
        .mockResolvedValue(null);

      const query = {
        street: '__STREET__',
        streetNumber: '__STREENUMBER__',
        city: '__CITY__',
        postalCode: '__POSTALCODE__',
        country: '__COUNTRY__',
        lon: '_LONGITUDE',
        lat: '__LATITUDE__',
      };

      await expect(() => useCase.execute(query)).rejects.toThrow(
        AddressErrors.AddressNotFound
      );

      expect(getAddressMock.mock.calls).toEqual([
        [
          {
            street: '__STREET__',
            streetNumber: '__STREENUMBER__',
            city: '__CITY__',
            postalCode: '__POSTALCODE__',
            country: '__COUNTRY__',
            lon: '_LONGITUDE',
            lat: '__LATITUDE__',
          },
        ],
      ]);
    });

    it('should return the latitude an longitude coordinates', async () => {
      const repo = new NominatinGeoLocationRepo();
      const useCase = new GetValidateAddressUseCase(repo);

      const getAddressMock = jest.spyOn(repo, 'getAddress').mockResolvedValue({
        latitude: '__LATITUDE__',
        longitude: '__LONGITUDE__',
      } as never);

      const query = {
        street: '__STREET__',
        streetNumber: '__STREENUMBER__',
        city: '__CITY__',
        postalCode: '__POSTALCODE__',
        country: '__COUNTRY__',
        lon: '_LONGITUDE',
        lat: '__LATITUDE__',
      };

      const response = await useCase.execute(query);

      expect(response).toEqual({
        latitude: '__LATITUDE__',
        longitude: '__LONGITUDE__',
      });
      expect(getAddressMock.mock.calls).toEqual([
        [
          {
            street: '__STREET__',
            streetNumber: '__STREENUMBER__',
            city: '__CITY__',
            postalCode: '__POSTALCODE__',
            country: '__COUNTRY__',
            lon: '_LONGITUDE',
            lat: '__LATITUDE__',
          },
        ],
      ]);
    });
  });
});
