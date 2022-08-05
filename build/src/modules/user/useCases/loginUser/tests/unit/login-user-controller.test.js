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
Object.defineProperty(exports, "__esModule", { value: true });
const login_user_mongo_repo_1 = require("../../../../repos/login.user.mongo-repo");
const login_user_use_case_1 = require("../../login-user.use-case");
const login_user_errors_1 = require("../../login-user.errors");
describe('#modules#users#LoginUserController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('#execute', () => {
        it('should return the token', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const useCase = new login_user_use_case_1.LoginUserUseCase(repo);
            const executeMock = jest
                .spyOn(useCase, 'execute')
                .mockResolvedValue({ token: '__TOKEN__' });
            const response = yield useCase.execute({
                email: '__EMAIL__',
                password: '__PASSWORD__',
            });
            expect(response).toEqual({ token: '__TOKEN__' });
            expect(executeMock.mock.calls).toEqual([
                [{ email: '__EMAIL__', password: '__PASSWORD__' }],
            ]);
        }));
        it('should return a 404 error if the user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const useCase = new login_user_use_case_1.LoginUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue(null);
            const response = {
                email: '__EMAIL__',
                password: '__PASSWORD__',
            };
            yield expect(() => useCase.execute(response)).rejects.toThrow(login_user_errors_1.LoginUserErrors.userNotfound);
            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
        }));
    });
});
