"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT || 3000,
    tokenKey: process.env.TOKENKEY || 'tokenkey',
    tokenKeyGenerated: process.env.TOKENGENERATED ||
        '1dd8a7c682a987c1e3a48e21293d58442937f7a9f647ef8643eeab030bbafbc453ed23605242cd88d3be079cfffc037a3ae2f11a29ab259a1e488de1cc33ef4e',
    DB: process.env.DATABASE_URI,
    NOMINATIN_URL: process.env.NOMINATIN_URL || 'https://nominatim.openstreetmap.org/search?',
    WEATHER_URL: process.env.TIMER_WEATHER_BASE_URL || 'http://www.7timer.info/bin/api.pl?',
    USER_CREDENTIALS: process.env.USER_CREDENTIALS || 'userCredentials',
    REDIS_CACHE: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map