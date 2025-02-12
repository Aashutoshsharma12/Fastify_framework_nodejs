"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./utils/database"));
const socket_1 = __importDefault(require("./utils/socket"));
// // Create a raw HTTP server for Fastify (since Fastify v5 doesn't support socket.io directly)
const PORT = process.env.PORT || 4001; // Use Render-assigned port or fallback
server_1.default.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        server_1.default.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    (0, database_1.default)();
});
exports.io = new socket_io_1.Server(server_1.default.server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
    // transport: "polling",
});
// ✅ Initialize Socket Handlers
(0, socket_1.default)(exports.io);
