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
const supertest_1 = __importDefault(require("supertest"));
const user_model_1 = __importDefault(require("../../../../../../models/user.model"));
const app_1 = __importDefault(require("../../../../../../app"));
describe('#modules#users#registerUserrUseCase#tests#integration', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('POST/register', () => {
        it('should create an user', () => __awaiter(void 0, void 0, void 0, function* () {
            const findOneMock = jest
                .spyOn(user_model_1.default, 'findOne')
                .mockResolvedValue(null);
            const hashMock = jest
                .spyOn(bcrypt_1.default, 'hash')
                .mockResolvedValue('__ENCRIPTEDPASSWORD__');
            const createMock = jest.spyOn(user_model_1.default, 'create').mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            });
            const { status, body } = yield (0, supertest_1.default)(app_1.default)
                .post('/user/register/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });
            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    _id: '000000000000000000000000',
                    password: '__ENCRIPTEDPASSWORD__',
                    email: '__EMAIL__',
                },
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
            expect(hashMock.mock.calls).toEqual([['__PASSWORD__', 10]]);
            expect(createMock.mock.calls).toEqual([
                [{ email: '__EMAIL__', password: '__ENCRIPTEDPASSWORD__' }],
            ]);
        }));
        it('should return a 500 status code if there is a server error', () => __awaiter(void 0, void 0, void 0, function* () {
            const findOneMock = jest
                .spyOn(user_model_1.default, 'findOne')
                .mockRejectedValue(null);
            const { status, body } = yield (0, supertest_1.default)(app_1.default)
                .post('/user/register/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });
            expect({ status, body }).toEqual({
                status: 500,
                body: {},
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        }));
    });
});
