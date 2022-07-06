import request from 'supertest';
import userModel from '../../../../../../../../src/models/user.model';
import app from '../../../../../../../app';

describe('#modules#users#getUsersUserUseCase#tests#integration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET/users', () => {
    it('should return all the users', async () => {
      const findMock = jest.spyOn(userModel, 'find').mockResolvedValue([
        {
          _id: '000000000000000000000000',
          email: '__EMAIL__',
          token: '__TOKEN__',
        },
      ] as never);

      const { status, body } = await request(app).get('/').send();

      expect({ status, body }).toEqual({
        status: 200,
        body: [
          {
            _id: '000000000000000000000000',
            email: '__EMAIL__',
            token: '__TOKEN__',
          },
        ],
      });

      expect(findMock.mock.calls).toEqual([[]]);
    });
  });
});
