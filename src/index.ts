import { Server } from 'socket.io';
import http from 'http';
import fastify from './server';
import connectDb from './utils/database';
import socketHandler from "./utils/socket";

// // Create a raw HTTP server for Fastify (since Fastify v5 doesn't support socket.io directly)
const PORT: any = process.env.PORT || 4001; // Use Render-assigned port or fallback

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err: any, address: any) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    connectDb();
})
export const io = new Server(fastify.server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
    // transport: "polling",
});
// ✅ Initialize Socket Handlers
socketHandler(io);