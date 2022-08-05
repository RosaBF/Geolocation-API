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
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const index_1 = require("../../useCases/getUsers/index");
const index_2 = require("../../useCases/loginUser/index");
const index_3 = require("../../useCases/registerUser/index");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return index_1.getUsersController.execute(req, res); }));
router.post('/login', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return index_2.loginUserController.execute(req, res); }));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return index_3.registerUserController.execute(req, res); }));
