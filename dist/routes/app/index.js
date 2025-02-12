"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes1;
const user_1 = __importDefault(require("./user"));
const common_1 = __importDefault(require("./common"));
async function routes1(fastify) {
    fastify.register(user_1.default, { prefix: '/user' });
    fastify.register(common_1.default, { prefix: '/common' });
}
