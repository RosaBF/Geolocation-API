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
exports.LoginUserUseCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login_user_errors_1 = require("./login-user.errors");
const config_1 = __importDefault(require("../../../../../config"));
class LoginUserUseCase {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    execute(loginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginParams;
            const userFound = yield this.usersRepo.getUserByEmail(email);
            if (!userFound) {
                throw new login_user_errors_1.LoginUserErrors.userNotfound(email);
            }
            const isCorrectPassword = yield bcrypt_1.default.compare(password, userFound.password);
            if (!isCorrectPassword) {
                throw new login_user_errors_1.LoginUserErrors.passwordInvalid();
            }
            const token = jsonwebtoken_1.default.sign({ id: userFound._id, email: userFound.email }, config_1.default.tokenKey, {
                expiresIn: '10h',
            });
            yield this.usersRepo.saveUserToken(userFound._id, token);
            return { token };
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
