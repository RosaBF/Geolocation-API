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
const repos_1 = require("../../../../repos");
const register_user_use_case_1 = require("../../register-user.use-case");
const register_user_errors_1 = require("../../register-user.errors");
describe('#modules#user#registerUserUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('#execute', () => {
        it('should register the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new repos_1.MongoUserRepo();
            const useCase = new register_user_use_case_1.RegisterUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue(null);
            const hashMock = jest
                .spyOn(bcrypt_1.default, 'hash')
                .mockResolvedValue('__ENCRIPTEDPASSWORD__');
            const createUserMock = jest.spyOn(repo, 'createUser').mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            });
            const ret = yield useCase.execute({
                password: '__PASSWORD__',
                email: '__EMAIL__',
            });
            expect(ret).toEqual({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                email: '__EMAIL__',
                password: '__ENCRIPTEDPASSWORD__',
            });
            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(hashMock.mock.calls).toEqual([['__PASSWORD__', 10]]);
            expect(createUserMock.mock.calls).toEqual([
                [
                    {
                        password: '__ENCRIPTEDPASSWORD__',
                        email: '__EMAIL__',
                    },
                ],
            ]);
        }));
        it('should show the error UserAlreadyRegistered if the user already exists ', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new repos_1.MongoUserRepo();
            const useCase = new register_user_use_case_1.RegisterUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const response = {
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            };
            yield expect(() => useCase.execute(response)).rejects.toThrow(register_user_errors_1.RegisterUserErrors.UserAlreadyRegistered);
            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
        }));
    });
});
