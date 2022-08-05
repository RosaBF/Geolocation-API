"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserErrors = void 0;
var RegisterUserErrors;
(function (RegisterUserErrors) {
    class UserAlreadyRegistered extends Error {
        constructor(email) {
            super(`User ${email} already exists`);
        }
    }
    RegisterUserErrors.UserAlreadyRegistered = UserAlreadyRegistered;
})(RegisterUserErrors = exports.RegisterUserErrors || (exports.RegisterUserErrors = {}));
