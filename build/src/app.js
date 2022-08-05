"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = require("./modules/user/infrastructure/http/users.routes");
//create express server
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware que transforma la req.body a un json
app.use(express_1.default.urlencoded({ extended: true }));
//Routes
app.use('/user', users_routes_1.userRouter);
app.use('/login', users_routes_1.userRouter);
app.use('/register', users_routes_1.userRouter);
exports.default = app;
