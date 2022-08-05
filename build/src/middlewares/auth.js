"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).send({ msg: 'Token required for authoritation' });
    }
    try {
        jsonwebtoken_1.default.verify(bearerToken, config_1.default.tokenKey);
        next();
    }
    catch (error) {
        res.status(401).send({ msg: 'Token not valid' });
    }
    return bearerToken;
}
exports.verifyToken = verifyToken;
