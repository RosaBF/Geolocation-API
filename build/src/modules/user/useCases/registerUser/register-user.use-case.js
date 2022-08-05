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
exports.RegisterUserUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_user_errors_1 = require("./register-user.errors");
class RegisterUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(registerParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = registerParams;
            const userFound = yield this.userRepo.getUserByEmail(email);
            if (userFound) {
                throw new register_user_errors_1.RegisterUserErrors.UserAlreadyRegistered(email);
            }
            const encriptedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                email,
                password: encriptedPassword,
            };
            const registeredUser = yield this.userRepo.createUser(newUser);
            return registeredUser;
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
