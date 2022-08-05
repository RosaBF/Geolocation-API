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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repos_1 = require("../../../../repos");
const login_user_use_case_1 = require("../../login-user.use-case");
const login_user_errors_1 = require("../../login-user.errors");
describe('#modules#users#LoginUsersUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('#execute', () => {
        it('should login the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new repos_1.MongoUserRepo();
            const usecase = new login_user_use_case_1.LoginUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const compareMock = jest
                .spyOn(bcrypt_1.default, 'compare')
                .mockResolvedValue(true);
            const signMock = jest
                .spyOn(jsonwebtoken_1.default, 'sign')
                .mockReturnValue('__TOKEN__');
            const saveUserTokenMock = jest
                .spyOn(repo, 'saveUserToken')
                .mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const ret = yield usecase.execute({
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
                        id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    },
                    'tokenkey',
                    {
                        expiresIn: '10h',
                    },
                ],
            ]);
            expect(saveUserTokenMock.mock.calls).toEqual([
                [new mongoose_1.Types.ObjectId('000000000000000000000000'), '__TOKEN__'],
            ]);
        }));
        it('should show the error UserNotFound if there is no user', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new repos_1.MongoUserRepo();
            const useCase = new login_user_use_case_1.LoginUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue(null);
            const response = {
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            };
            yield expect(() => useCase.execute(response)).rejects.toThrow(login_user_errors_1.LoginUserErrors.userNotfound);
            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
        }));
        it('should show the error UserInvalidPassword if there password is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new repos_1.MongoUserRepo();
            const useCase = new login_user_use_case_1.LoginUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue({
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const compareMock = jest
                .spyOn(bcrypt_1.default, 'compare')
                .mockResolvedValue(false);
            const response = {
                password: '__PASSWORD__',
                email: '__EMAIL__',
            };
            yield expect(() => useCase.execute(response)).rejects.toThrow(login_user_errors_1.LoginUserErrors.passwordInvalid);
            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(compareMock.mock.calls).toEqual([
                ['__PASSWORD__', '__PASSWORD__'],
            ]);
        }));
    });
});
