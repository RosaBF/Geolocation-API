import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoUserRepo } from '../../../../repos';
import { LoginUserUseCase } from '../../login-user.use-case';
import { LoginUserErrors } from '../../login-user.errors';
import config from '../../../../../../config';

describe('#modules#users#LoginUsersUseCase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#execute', () => {
    it('should login the user', async () => {
      const tokenGenerated = config.tokenKeyGenerated;
      const repo = new MongoUserRepo();
      const usecase = new LoginUserUseCase(repo);
      const getUserByEmailMock = jest
        .spyOn(repo, 'getUserByEmail')
        .mockResolvedValue({
          _id: new Types.ObjectId('000000000000000000000000'),
          password: '__PASSWORD__',
          email: '__EMAIL__',
          token: '__TOKEN__',
        } as never);

      const compareMock = jest
        .spyOn(bcrypt, 'compare')
        .mockResolvedValue(true as never);
      const signMock = jest
        .spyOn(jwt, 'sign')
        .mockReturnValue('__TOKEN__' as never);
      const saveUserTokenMock = jest
        .spyOn(repo, 'saveUserToken')
        .mockResolvedValue({
          _id: new Types.ObjectId('000000000000000000000000'),
          password: '__PASSWORD__',
          email: '__EMAIL__',
          token: '__TOKEN__',
        } as never);

      const ret = await usecase.execute({
        email: '__EMAIL__',
        password: '__PASSWORD__',
      });

      expect(ret).toEqual({ token: '__TOKEN__' });

      expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
      expect(compareMock.mock.calls).toEqual([
        ['__PASSWORD__', '__PASSWORD__'],
      ]);
      expect(signMock.mock.calls).toEqual([
        [
          {
            email: '__EMAIL__',
            id: new Types.ObjectId('000000000000000000000000'),
          },
          tokenGenerated,

          {
            expiresIn: '10h',
          },
        ],
      ]);
      expect(saveUserTokenMock.mock.calls).toEqual([
        [new Types.ObjectId('000000000000000000000000'), '__TOKEN__'],
      ]);
    });
    it('should show the error UserNotFound if there is no user', async () => {
      const repo = new MongoUserRepo();
      const useCase = new LoginUserUseCase(repo);
      const getUserByEmailMock = jest
        .spyOn(repo, 'getUserByEmail')
        .mockResolvedValue(null);

      const response = {
        password: '__PASSWORD__',
        email: '__EMAIL__',
        token: '__TOKEN__',
      };

      await expect(() => useCase.execute(response)).rejects.toThrow(
        LoginUserErrors.userNotfound
      );

      expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
    });

    it('should show the error UserInvalidPassword if there password is invalid', async () => {
      const repo = new MongoUserRepo();
      const useCase = new LoginUserUseCase(repo);
      const getUserByEmailMock = jest
        .spyOn(repo, 'getUserByEmail')
        .mockResolvedValue({
          password: '__PASSWORD__',
          email: '__EMAIL__',
          token: '__TOKEN__',
        } as never);
      const compareMock = jest
        .spyOn(bcrypt, 'compare')
        .mockResolvedValue(false as never);

      const response = {
        password: '__PASSWORD__',
        email: '__EMAIL__',
      };

      await expect(() => useCase.execute(response)).rejects.toThrow(
        LoginUserErrors.passwordInvalid
      );
      expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
      expect(compareMock.mock.calls).toEqual([
        ['__PASSWORD__', '__PASSWORD__'],
      ]);
    });
  });
});
