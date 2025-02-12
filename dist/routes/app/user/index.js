"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoute;
const home_1 = __importDefault(require("./home"));
async function userRoute(fastify) {
    fastify.register(home_1.default, { prefix: '/home' });
}
