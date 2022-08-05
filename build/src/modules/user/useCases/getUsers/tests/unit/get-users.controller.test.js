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
const login_user_mongo_repo_1 = require("../../../../repos/login.user.mongo-repo");
const get_users_use_case_1 = __importDefault(require("../../get-users.use-case"));
describe('#modules#users#getUsersController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('#execute', () => {
        it('should execute the getUsersUseCase', () => __awaiter(void 0, void 0, void 0, function* () {
            const repo = new login_user_mongo_repo_1.MongoUserRepo();
            const useCase = new get_users_use_case_1.default(repo);
            const executeMock = jest.spyOn(useCase, 'execute').mockResolvedValue([
                {
                    _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                    password: '__PASSWORD__',
                },
            ]);
            const ret = yield useCase.execute();
            expect(ret).toEqual([
                {
                    _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                    password: '__PASSWORD__',
                },
            ]);
            expect(executeMock.mock.calls).toEqual([[]]);
        }));
    });
});
