"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = homeRoute;
const http_status_codes_1 = require("http-status-codes");
const home_1 = __importDefault(require("./../../../controllers/user/home"));
const authenticate_1 = require("./../../../utils/authenticate");
async function homeRoute(fastify) {
    fastify.get('/userList', { preHandler: (0, authenticate_1.authorizeRoles)(['user1', 'user']) }, async (req, reply) => {
        const data = await home_1.default.userList(req.query, req.user.id, req.headers);
        reply.status(http_status_codes_1.StatusCodes.OK).send({ data: data, code: http_status_codes_1.StatusCodes.OK });
    });
}
