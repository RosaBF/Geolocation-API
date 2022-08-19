import { Types } from 'mongoose';
import { MongoUserRepo } from '../../../../repos/login.user.mongo-repo';
import GetUsersUseCase from '../../get-users.use-case';

describe('#modules#users#getUsersController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#execute', () => {
    it('should execute the getUsersUseCase', async () => {
      const repo = new MongoUserRepo();
      const useCase = new GetUsersUseCase(repo);

      const executeMock = jest.spyOn(useCase, 'execute').mockResolvedValue([
        {
          _id: new Types.ObjectId('000000000000000000000000'),
          email: '__EMAIL__',
          token: '__TOKEN__',
          password: '__PASSWORD__',
        },
      ] as never);

      const ret = await useCase.execute();

      expect(ret).toEqual([
        {
          _id: new Types.ObjectId('000000000000000000000000'),
          email: '__EMAIL__',
          token: '__TOKEN__',
          password: '__PASSWORD__',
        },
      ]);

      expect(executeMock.mock.calls).toEqual([[]]);
    });
  });
});
