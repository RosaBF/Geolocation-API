"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        reqired: true,
    },
});
exports.default = userSchema;
