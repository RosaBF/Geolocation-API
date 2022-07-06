import { Types } from 'mongoose';
import { MongoUserRepo } from './login.user.mongo-repo';
import userModel from '../../../models/user.model';

describe('#modules#users#userMongoRepo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#getAllUsers', () => {
    it('should retrieve the list of users', async () => {
      const repo = new MongoUserRepo();
      const findMock = jest.spyOn(userModel, 'find').mockResolvedValue([
        {
          _id: new Types.ObjectId('000000000000000000000000'),
          email: '__EMAIL__',
          token: '__TOKEN__',
          password: '__PASSWORD__',
        },
      ] as never);

      const ret = await repo.getAllUsers();

      expect(ret).toEqual([
        {
          _id: new Types.ObjectId('000000000000000000000000'),
          email: '__EMAIL__',
          token: '__TOKEN__',
          password: '__PASSWORD__',
        },
      ]);

      expect(findMock.mock.calls).toEqual([[]]);
    });
  });

  describe('#getUserByEmail', () => {
    it('should retrieve an user by e-mail address', async () => {
      const repo = new MongoUserRepo();
      const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
        email: '__EMAIL__',
        token: '__TOKEN__',
        password: '__PASSWORD__',
      });

      const ret = await repo.getUserByEmail('__EMAIL__');

      expect(ret).toEqual({
        email: '__EMAIL__',
        token: '__TOKEN__',
        password: '__PASSWORD__',
      });

      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
    });

    it('should retrieve null if an user in not found', async () => {
      const repo = new MongoUserRepo();
      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValue(null);

      const ret = await repo.getUserByEmail('__EMAIL__');

      expect(ret).toBeNull();

      expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
    });
  });

  describe('#createUser', () => {
    it('should create an user', async () => {
      const repo = new MongoUserRepo();
      const createUserMock = jest.spyOn(userModel, 'create').mockResolvedValue({
        _id: new Types.ObjectId('000000000000000000000000'),
        email: '__EMAIL__',
        password: '__PASSWORD__',
        token: '__TOKEN__',
      } as never);

      const ret = await repo.createUser({
        email: '__EMAIL__',
        password: '__PASSWORD__',
      });

      expect(ret).toEqual({
        _id: new Types.ObjectId('000000000000000000000000'),
        email: '__EMAIL__',
        password: '__PASSWORD__',
        token: '__TOKEN__',
      });

      expect(createUserMock.mock.calls).toEqual([
        [
          {
            email: '__EMAIL__',
            password: '__PASSWORD__',
          },
        ],
      ]);
    });
  });

  describe('#saveUserToken', () => {
    it('should save the user token', async () => {
      const repo = new MongoUserRepo();
      const findByIdAndUpdatMock = jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValue({
          _id: new Types.ObjectId('000000000000000000000000'),
          email: '__EMAIL__',
          password: '__PASSWORD__',
          token: '__TOKEN__',
        });

      const ret = await repo.saveUserToken('__ID__', '__TOKEN__');

      expect(ret).toEqual({
        _id: new Types.ObjectId('000000000000000000000000'),
        email: '__EMAIL__',
        password: '__PASSWORD__',
        token: '__TOKEN__',
      });

      expect(findByIdAndUpdatMock.mock.calls).toEqual([
        ['__ID__', { token: '__TOKEN__' }],
      ]);
    });

    it('should retrieve null if an user id in not found', async () => {
      const repo = new MongoUserRepo();
      const findByIdAndUpdatMock = jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValue(null);

      const ret = await repo.saveUserToken('__ID__', '__TOKEN__');

      expect(ret).toBeNull();

      expect(findByIdAndUpdatMock.mock.calls).toEqual([
        ['__ID__', { token: '__TOKEN__' }],
      ]);
    });
  });
});
