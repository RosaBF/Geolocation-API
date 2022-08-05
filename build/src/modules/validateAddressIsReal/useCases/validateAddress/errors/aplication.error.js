"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message) {
        const superMessage = message;
        super(superMessage);
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
