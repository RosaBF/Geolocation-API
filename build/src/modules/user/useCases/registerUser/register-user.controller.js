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
exports.RegisterUserController = void 0;
const register_user_errors_1 = require("./register-user.errors");
class RegisterUserController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                email: req.body.email,
                password: req.body.password,
            };
            try {
                const useCaseResponse = yield this.registerUserUseCase.execute(newUser);
                res.send(useCaseResponse);
            }
            catch (error) {
                switch (error) {
                    case register_user_errors_1.RegisterUserErrors.UserAlreadyRegistered:
                        res.send(409).send({ message: error.message });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
        });
    }
}
exports.RegisterUserController = RegisterUserController;
