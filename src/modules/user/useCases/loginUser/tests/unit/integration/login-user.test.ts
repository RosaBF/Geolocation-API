import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../../../../../../../models/user.model';
import request from 'supertest';
import app from '../../../../../../../app';
import config from '../../../../../../../config';

describe('#modules#user#loginUserUseCase#tests#integration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST/login', () => {
    it('should return a token for the login if the password is correct', async () => {
      const hashedPassword = config.tokenKeyGenerated;
      const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
        _id: new Types.ObjectId('000000000000000000000000'),
        password: hashedPassword,
        email: '__EMAIL__',
        token: '__TOKEN__',
      } as never);

      const compareMock = jest
        .spyOn(bcrypt, 'compare')
        .mockResolvedValue(true as never);
      const signMock = jest
        .spyOn(jwt, 'sign')
        .mockReturnValue('__TOKEN__' as never);
      const findByIdAndUpdateMock = jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValue({
          _id: new Types.ObjectId('000000000000000000000000'),
          password: hashedPassword,
          email: '__EMAIL__',
          token: '__TOKEN__',
        } as never);

      const { status, body } = await request(app)
        .post('/login/')
        .send({ email: '__EMAIL__', password: '1234' });

      expect({ status, body }).toEqual({
        status: 200,
        body: { token: '__TOKEN__' },
      });
      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
      expect(findByIdAndUpdateMock.mock.calls).toEqual([
        [
          new Types.ObjectId('000000000000000000000000'),
          { token: '__TOKEN__' },
        ],
      ]);
      expect(compareMock.mock.calls).toEqual([
        [
          '1234',
          '1dd8a7c682a987c1e3a48e21293d58442937f7a9f647ef8643eeab030bbafbc453ed23605242cd88d3be079cfffc037a3ae2f11a29ab259a1e488de1cc33ef4e',
        ],
      ]);
      expect(signMock.mock.calls).toEqual([
        [
          {
            email: '__EMAIL__',
            id: new Types.ObjectId('000000000000000000000000'),
          },
          'tokenkey',
          {
            expiresIn: '10h',
          },
        ],
      ]);
    });

    it('should return a 404 status code if user is not found', async () => {
      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValue(null);
      const { status, body } = await request(app)
        .post('/login/')
        .send({ email: '__EMAIL__', password: '__PASSWORD__' });

      expect({ status, body }).toEqual({
        status: 404,
        body: { message: 'User __EMAIL__ not found' },
      });

      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
    });
  });
});
