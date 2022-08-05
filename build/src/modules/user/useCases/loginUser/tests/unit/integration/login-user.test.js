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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../../../../../../models/user.model"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../../../../../app"));
const config_1 = __importDefault(require("../../../../../../../../config"));
describe('#modules#user#loginUserUseCase#tests#integration', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('POST/login', () => {
        it('should return a token for the login if the password is correct', () => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPassword = config_1.default.tokenKeyGenerated;
            const findOneMock = jest.spyOn(user_model_1.default, 'findOne').mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: hashedPassword,
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const compareMock = jest
                .spyOn(bcrypt_1.default, 'compare')
                .mockResolvedValue(true);
            const signMock = jest
                .spyOn(jsonwebtoken_1.default, 'sign')
                .mockReturnValue('__TOKEN__');
            const findByIdAndUpdateMock = jest
                .spyOn(user_model_1.default, 'findByIdAndUpdate')
                .mockResolvedValue({
                _id: new mongoose_1.Types.ObjectId('000000000000000000000000'),
                password: hashedPassword,
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            const { status, body } = yield (0, supertest_1.default)(app_1.default)
                .post('/login/')
                .send({ email: '__EMAIL__', password: '1234' });
            expect({ status, body }).toEqual({
                status: 200,
                body: { token: '__TOKEN__' },
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
            expect(findByIdAndUpdateMock.mock.calls).toEqual([
                [
                    new mongoose_1.Types.ObjectId('000000000000000000000000'),
                    { token: '__TOKEN__' },
                ],
            ]);
            expect(compareMock.mock.calls).toEqual([
                [
                    '1234',
                    '1dd8a7c682a987c1e3a48e21293d58442937f7a9f647ef8643eeab030bbafbc453ed23605242cd88d3be079cfffc037a3ae2f11a29ab259a1e488de1cc33ef4e',
                ],
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
        }));
        it('should return a 404 status code if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const findOneMock = jest
                .spyOn(user_model_1.default, 'findOne')
                .mockResolvedValue(null);
            const { status, body } = yield (0, supertest_1.default)(app_1.default)
                .post('/login/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });
            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'User __EMAIL__ not found' },
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        }));
    });
});
