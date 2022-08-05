"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const login_user_mongo_repo_1 = require("../login.user.mongo-repo");
const user_model_1 = __importDefault(require("../../../../models/user.model"));
describe('#modules#users#userMongoRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('#getAllUsers', () => {
        it('should retrieve the list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const findMock = jest.spyOn(user_model_1.default, 'find').mockResolvedValue([
                {
                    _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                    password: '__PASSWORD__',
                },
            ]);
            const ret = yield repo.getAllUsers();
            expect(ret).toEqual([
                {
                    _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                    password: '__PASSWORD__',
                },
            ]);
            expect(findMock.mock.calls).toEqual([[]]);
        }));
    });
    describe('#getUserByEmail', () => {
        it('should retrieve an user by e-mail address', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const findOneMock = jest.spyOn(user_model_1.default, 'findOne').mockResolvedValue({
                email: '__EMAIL__',
                token: '__TOKEN__',
                password: '__PASSWORD__',
            });
            const ret = yield repo.getUserByEmail('__EMAIL__');
            expect(ret).toEqual({
                email: '__EMAIL__',
                token: '__TOKEN__',
                password: '__PASSWORD__',
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        }));
        it('should retrieve null if an user in not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const findOneMock = jest
                .spyOn(user_model_1.default, 'findOne')
                .mockResolvedValue(null);
            const ret = yield repo.getUserByEmail('__EMAIL__');
            expect(ret).toBeNull();
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        }));
    });
    describe('#createUser', () => {
        it('should create an user', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const createUserMock = jest.spyOn(user_model_1.default, 'create').mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                email: '__EMAIL__',
                password: '__PASSWORD__',
                token: '__TOKEN__',
            });
            const ret = yield repo.createUser({
                email: '__EMAIL__',
                password: '__PASSWORD__',
            });
            expect(ret).toEqual({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
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
        }));
    });
    describe('#saveUserToken', () => {
        it('should save the user token', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const findByIdAndUpdatMock = jest
                .spyOn(user_model_1.default, 'findByIdAndUpdate')
                .mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                email: '__EMAIL__',
                password: '__PASSWORD__',
                token: '__TOKEN__',
            });
            const ret = yield repo.saveUserToken('__ID__', '__TOKEN__');
            expect(ret).toEqual({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                email: '__EMAIL__',
                password: '__PASSWORD__',
                token: '__TOKEN__',
            });
            expect(findByIdAndUpdatMock.mock.calls).toEqual([
                ['__ID__', { token: '__TOKEN__' }],
            ]);
        }));
        it('should retrieve null if an user id in not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const findByIdAndUpdatMock = jest
                .spyOn(user_model_1.default, 'findByIdAndUpdate')
                .mockResolvedValue(null);
            const ret = yield repo.saveUserToken('__ID__', '__TOKEN__');
            expect(ret).toBeNull();
            expect(findByIdAndUpdatMock.mock.calls).toEqual([
                ['__ID__', { token: '__TOKEN__' }],
            ]);
        }));
    });
});
