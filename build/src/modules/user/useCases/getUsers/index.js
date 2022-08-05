"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const login_user_mongo_repo_1 = require("../../repos/login.user.mongo-repo");
const get_users_use_case_1 = __importDefault(require("./get-users.use-case"));
const get_users_controller_1 = __importDefault(require("./get-users.controller"));
const repo = new login_user_mongo_repo_1.MongoUserRepo();
const useCase = new get_users_use_case_1.default(repo);
const getUsersController = new get_users_controller_1.default(useCase);
exports.getUsersController = getUsersController;
