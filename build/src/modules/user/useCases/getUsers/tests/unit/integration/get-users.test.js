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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("../../../../../../../../src/models/user.model"));
const app_1 = __importDefault(require("../../../../../../../app"));
describe('#modules#user#getUsersUserUseCase#tests#integration', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('GET/users', () => {
        it('should return all the users', () => __awaiter(void 0, void 0, void 0, function* () {
            const findMock = jest.spyOn(user_model_1.default, 'find').mockResolvedValue([
                {
                    _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                    password: '__PASSWORD__',
                },
            ]);
            const { status, body } = yield (0, supertest_1.default)(app_1.default).get('/user').send();
            expect({ status, body }).toEqual({
                status: 200,
                body: [
                    {
                        _id: '000000000000000000000000',
                        email: '__EMAIL__',
                        token: '__TOKEN__',
                        password: '__PASSWORD__',
                    },
                ],
            });
            expect(findMock.mock.calls).toEqual([[]]);
        }));
    });
});
