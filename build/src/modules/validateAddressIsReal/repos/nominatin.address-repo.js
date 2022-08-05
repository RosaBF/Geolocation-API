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
exports.NominatinGeoLocationRepo = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../../config"));
class NominatinGeoLocationRepo {
    constructor(_url) {
        this.url = config_1.default.NOMINATIN_URL || '';
    }
    getAddress(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                street: query.street,
                city: query.city,
                country: query.country,
                postalCode: query.postalCode,
                streetNumber: query.streetNumber,
            };
            const urlBase = `${this.url}${queryParams}&format=json&limit=1`;
            const response = yield axios_1.default.get(urlBase);
            if (!response.data.length) {
                return null;
            }
            const addressResponse = response.data[0];
            const address = {
                street: addressResponse.street,
                streetNumber: addressResponse.streetNumber,
                city: addressResponse.city,
                country: addressResponse.country,
                postalCode: addressResponse.postalCode,
                lat: addressResponse.lat,
                lon: addressResponse.lon,
            };
            const addressValidated = { address: address };
            return addressValidated;
        });
    }
}
exports.NominatinGeoLocationRepo = NominatinGeoLocationRepo;
