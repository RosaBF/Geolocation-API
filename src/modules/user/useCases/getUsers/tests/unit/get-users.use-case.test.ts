import { MongoUserRepo } from '../../../../repos/login.user.mongo-repo';
import GetUsersUseCase from '../../get-users.use-case';

describe('#modules#users#getUsersUseCase', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#execute', () => {
    it('should retrieve the list of users', async () => {
      const repo = new MongoUserRepo();
      const useCase = new GetUsersUseCase(repo);
      const getAllUsersMock = jest
        .spyOn(repo, 'getAllUsers')
        .mockResolvedValue([
          {
            email: '__EMAIL__',
            token: '__TOKEN__',
            password: '__PASSWORD__',
          },
        ] as never);

      const ret = await useCase.execute();

      expect(ret).toEqual([
        {
          email: '__EMAIL__',
          token: '__TOKEN__',
          password: '__PASSWORD__',
        },
      ]);
      expect(getAllUsersMock.mock.calls).toEqual([[]]);
    });
  });
});
