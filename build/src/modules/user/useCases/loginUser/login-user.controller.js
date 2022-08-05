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
exports.LoginUserController = void 0;
const login_user_errors_1 = require("./login-user.errors");
class LoginUserController {
    constructor(loginUserUsecase) {
        this.loginUserUsecase = loginUserUsecase;
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLoginParams = {
                email: req.body.email,
                password: req.body.password,
            };
            try {
                const loginUserUseCaseResponse = yield this.loginUserUsecase.execute(userLoginParams);
                res.send(loginUserUseCaseResponse);
            }
            catch (error) {
                switch (error.constructor) {
                    case login_user_errors_1.LoginUserErrors.userNotfound:
                        res.status(404).send({ message: error.message });
                        break;
                    case login_user_errors_1.LoginUserErrors.passwordInvalid:
                        res.status(403).send({ message: error.message });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
