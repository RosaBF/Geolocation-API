"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserErrors = void 0;
var LoginUserErrors;
(function (LoginUserErrors) {
    class userNotfound extends Error {
        constructor(email) {
            super(`User ${email} not found`);
        }
    }
    LoginUserErrors.userNotfound = userNotfound;
    class passwordInvalid extends Error {
        constructor() {
            super(`Invalid credentials`);
        }
    }
    LoginUserErrors.passwordInvalid = passwordInvalid;
})(LoginUserErrors = exports.LoginUserErrors || (exports.LoginUserErrors = {}));
