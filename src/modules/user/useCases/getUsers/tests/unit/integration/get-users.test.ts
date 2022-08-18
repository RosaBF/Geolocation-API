import request from 'supertest';
import { Types } from 'mongoose';
import userModel from '../../../../../../../../src/models/user.model';
import app from '../../../../../../../app';

describe('#modules#user#getUsersUserUseCase#tests#integration', () => {
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
          password: '__PASSWORD__',
        },
      ] as never);

      const { status, body } = await request(app).get('/user/').send();

      expect({ status, body }).toEqual({
        status: 200,
        body: [
          {
            _id: '000000000000000000000000',
            email: '__EMAIL__',
            token: '__TOKEN__',
            password: '__PASSWORD__',
          },
        ],
      });

      expect(findMock.mock.calls).toEqual([[]]);
    });
  });
});
