"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("./pre-start"); // Must be the first import
const fastify_1 = __importDefault(require("fastify"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./routes/app"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const fastify = (0, fastify_1.default)({
    logger: true, // Enables logging
    ajv: {
        customOptions: { allErrors: true },
        plugins: [ajv_errors_1.default], // Use ajv-errors plugin for custom messages
    }
});
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
// Register JWT plugin
fastify.register(jwt_1.default, {
    secret: JWT_SECRET_TOKEN.toString(), // Change this to a strong secret key
});
// Global Authentication Hook (Runs before every route)
fastify.addHook("preHandler", async (req, reply) => {
    if (req.url !== "/login" && req.url !== "/add" && req.url !== '/about' && req.url !== '/home') {
        const data = await req.jwtVerify(); // Verify token for protected routes
    }
});
// Global error handler
fastify.setErrorHandler((error, request, reply) => {
    // Log the error
    request.log.error(error);
    // Custom error response
    reply.status(error.statusCode || 500).send({
        success: false,
        message: error.message,
        error: error.message,
        code: error.code,
        statusCode: error.statusCode
    });
});
// Register CORS as a plugin (Recommended way)
fastify.register(cors_1.default, {
    origin: "*", // Allow all origins
    methods: ['GET', 'DELETE'], // Allowed HTTP methods
});
fastify.register(app_1.default, { prefix: "/api/v1" });
// Serve static files from the 'public' folder
fastify.register(require("@fastify/static"), {
    root: path_1.default.join(__dirname, "public"),
    prefix: "/",
});
fastify.get('/about', (req, reply) => {
    reply.sendFile('views/about.html');
});
fastify.get('/home', (req, reply) => {
    reply.sendFile('views/home.html');
});
module.exports = fastify;
