import axios from 'axios';
import request from 'supertest';
import app from '../../../../../app';

describe('#modules#validateAddressIsReal#GetValidateAddressUseCase#tests#integration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET/address', () => {
    it('should return the latitude and longitude coordinates', async () => {
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

      const query =
        '/address?housenumber=120&street=Serrano&city=Madrid&country=Spain&postalcode=28001';

      const { status, body } = await request(app).get(query).send();

      expect({ status, body }).toEqual({
        status: 200,
        body: {
          addressCoordinates: {
            lat: '__LATITUDE__',
            lon: '__LONGITUDE__',
          },
        },
      });

      expect(getMock.mock.calls).toEqual([
        [
          'https://nominatim.openstreetmap.org/search?housenumber=undefinedstreet=Serrano&city=Madrid&country=Spain&postalcode=undefined&format=json&limit=1',
        ],
      ]);
    });
  });
});
