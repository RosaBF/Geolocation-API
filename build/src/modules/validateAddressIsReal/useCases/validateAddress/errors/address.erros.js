"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressErrors = void 0;
const aplication_error_1 = require("./aplication.error");
var AddressErrors;
(function (AddressErrors) {
    class AddressInvalid extends aplication_error_1.ApplicationError {
        constructor() {
            super('The address is invalid');
        }
    }
    AddressErrors.AddressInvalid = AddressInvalid;
    class AddressNotFound extends aplication_error_1.ApplicationError {
        constructor() {
            super('Addess not Found');
        }
    }
    AddressErrors.AddressNotFound = AddressNotFound;
})(AddressErrors = exports.AddressErrors || (exports.AddressErrors = {}));
