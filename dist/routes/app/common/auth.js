"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoute;
const http_status_codes_1 = require("http-status-codes");
const auth_1 = __importDefault(require("./../../../controllers/common_api/auth"));
const authenticate_1 = require("./../../../utils/authenticate");
const user_1 = require("./../../../validators/user");
async function authRoute(fastify) {
    fastify.post('/addUser', { schema: user_1.add_userSchema }, async (req, reply) => {
        const data = await auth_1.default.addUser(req.body, fastify);
        reply.status(http_status_codes_1.StatusCodes.CREATED).send({ data: data, code: http_status_codes_1.StatusCodes.CREATED });
    });
    fastify.get('/getUser/:id', { preHandler: (0, authenticate_1.authorizeRoles)(['user']), schema: user_1.getUserSchema }, async (req, reply) => {
        const data = await auth_1.default.getUser(req.params);
        reply.status(http_status_codes_1.StatusCodes.OK).send({ data: data, code: http_status_codes_1.StatusCodes.OK });
    });
    fastify.get('/list', { preHandler: (0, authenticate_1.authorizeRoles)(['user']), schema: user_1.listUserSchema }, async (req, reply) => {
        const data = await auth_1.default.listUser(req.query);
        reply.status(http_status_codes_1.StatusCodes.OK).send({ data: data, code: http_status_codes_1.StatusCodes.OK });
    });
}
