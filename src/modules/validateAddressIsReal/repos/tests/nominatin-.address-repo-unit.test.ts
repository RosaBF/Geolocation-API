import { IAddressQueryDTO } from './../../dto/address.dto';
import axios from 'axios';
import { NominatinGeoLocationRepo } from './../nominatin.address-repo';

describe('#modules#geoLocation#geoLocationNominatinRepo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#getLocationCoordinates', () => {
    it('should return null if there are not locations', async () => {
      const repo = new NominatinGeoLocationRepo();
      const getMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

      const query: IAddressQueryDTO = {
        street: '__STREET__',
        streetNumber: '__STREENUMBER__',
        city: '__CITY__',
        postalCode: '__POSTALCODE__',
        country: '__COUNTRY__',
      };

      const ret = await repo.getAddress(query);

      expect(ret).toBeNull();
      expect(getMock.mock.calls).toEqual([
        [
          'https://nominatim.openstreetmap.org/search?housenumber=__STREENUMBER__street=__STREET__&city=__CITY__&country=__COUNTRY__&postalcode=__POSTALCODE__&format=json&limit=1',
        ],
      ]);
    });
    it('should return latitude and longitude coordinates ', async () => {
      const repo = new NominatinGeoLocationRepo();

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

      const ret = await repo.getAddress({
        street: '__STREET__',
        streetNumber: '__STREENUMBER__',
        city: '__CITY__',
        postalCode: '__POSTALCODE__',
        country: '__COUNTRY__',
      });

      expect(ret).toEqual({
        addressCoordinates: {
          lat: '__LATITUDE__',
          lon: '__LONGITUDE__',
        },
      });
      expect(getMock.mock.calls).toEqual([
        [
          'https://nominatim.openstreetmap.org/search?housenumber=__STREENUMBER__street=__STREET__&city=__CITY__&country=__COUNTRY__&postalcode=__POSTALCODE__&format=json&limit=1',
        ],
      ]);
    });
  });
});
