import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import userModel from '../../../../../../models/user.model';
import app from '../../../../../../app';

describe('#modules#users#registerUserrUseCase#tests#integration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST/register', () => {
    it('should create an user', async () => {
      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValue(null);
      const hashMock = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('__ENCRIPTEDPASSWORD__' as never);

      const createMock = jest.spyOn(userModel, 'create').mockResolvedValue({
        _id: new Types.ObjectId('000000000000000000000000'),
        password: '__ENCRIPTEDPASSWORD__',
        email: '__EMAIL__',
      } as never);

      const { status, body } = await request(app)
        .post('/users/register/')
        .send({ email: '__EMAIL__', password: '__PASSWORD__' });

      expect({ status, body }).toEqual({
        status: 200,
        body: {
          _id: '000000000000000000000000',
          password: '__ENCRIPTEDPASSWORD__',
          email: '__EMAIL__',
        },
      });

      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
      expect(hashMock.mock.calls).toEqual([['__PASSWORD__', 10]]);
      expect(createMock.mock.calls).toEqual([
        [{ email: '__EMAIL__', password: '__ENCRIPTEDPASSWORD__' }],
      ]);
    });

    it('should return a 500 status code if there is a server error', async () => {
      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockRejectedValue(null);
      const { status, body } = await request(app)
        .post('/users/register/')
        .send({ email: '__EMAIL__', password: '__PASSWORD__' });

      expect({ status, body }).toEqual({
        status: 500,
        body: {},
      });

      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
    });
  });
});
