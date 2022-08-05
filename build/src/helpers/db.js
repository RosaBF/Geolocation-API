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
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let database;
const DATABASE_URI = 'mongodbforweather://localhost:7000';
function connect() {
    if (database) {
        return;
    }
    mongoose_1.default.connect(DATABASE_URI);
    database = mongoose_1.default.connection;
    database.once('open', () => __awaiter(this, void 0, void 0, function* () {
        console.log('Successfully connection to Database');
    }));
    database.on('error', () => {
        console.log('Error connecting to MongoDB database');
    });
}
exports.connect = connect;
function disconnect() {
    if (!database) {
        return;
    }
    mongoose_1.default.disconnect();
}
exports.disconnect = disconnect;
