import { Types } from 'mongoose';
import { MongoUserRepo } from '../../../repos/login.user.mongo-repo';
import { LoginUserUseCase } from '../login-user.use-case';
import { LoginUserErrors } from '../login-user.errors';
import { LoginUserController } from '../login-user.controller';
import { loginUserController } from '..';

describe('#modules#users#LoginUserController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#execute', () => {
    it('should return the token', async () => {
      const repo = new MongoUserRepo();
      const useCase = new LoginUserUseCase(repo);
      const executeMock = jest
        .spyOn(useCase, 'execute')
        .mockResolvedValue({ token: '__TOKEN__' } as never);

      const response = await useCase.execute({
        email: '__EMAIL__',
        password: '__PASSWORD__',
      });

      expect(response).toEqual({ token: '__TOKEN__' });
      expect(executeMock.mock.calls).toEqual([
        [{ email: '__EMAIL__', password: '__PASSWORD__' }],
      ]);
    });

    it('should return a 404 error if the user is not found', async () => {
      const repo = new MongoUserRepo();
      const useCase = new LoginUserUseCase(repo);
      const getUserByEmailMock = jest
        .spyOn(repo, 'getUserByEmail')
        .mockResolvedValue(null);

      const response = {
        email: '__EMAIL__',
        password: '__PASSWORD__',
      };

      await expect(() => useCase.execute(response)).rejects.toThrow(
        LoginUserErrors.userNotfound
      );

      expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
    });
  });
});
