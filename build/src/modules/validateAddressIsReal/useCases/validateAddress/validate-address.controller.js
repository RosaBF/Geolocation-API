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
exports.IGetAddressValidatedController = void 0;
const address_dto_1 = require("./../../dto/address.dto");
const address_erros_1 = require("./errors/address.erros");
class IGetAddressValidatedController {
    constructor(iGetAddresValidatedUseCase) {
        this.iGetAddresValidatedUseCase = iGetAddresValidatedUseCase;
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAddressBody = {
                street: req.query.street,
                streetNumber: req.query.streetNumber,
                city: req.query.city,
                postalCode: req.query.postalCode,
                country: req.query.country,
            };
            try {
                this.validateAddress(getAddressBody);
                const addressResponse = yield this.iGetAddresValidatedUseCase.execute(getAddressBody);
                res.send(addressResponse);
            }
            catch (error) {
                switch (error.constructor) {
                    case address_erros_1.AddressErrors.AddressNotFound:
                        res.status(404).send({ message: error.message });
                        break;
                    case address_erros_1.AddressErrors.AddressInvalid:
                        res.status(401).send({ message: error.message });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
        });
    }
    validateAddress(addressBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield address_dto_1.validateIAddressDTOSchema.validateAsync(addressBody);
            if (error) {
                throw new address_erros_1.AddressErrors.AddressInvalid();
            }
        });
    }
}
exports.IGetAddressValidatedController = IGetAddressValidatedController;
