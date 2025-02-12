import "./pre-start"; // Must be the first import
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import path, { join } from "path";
import routes1 from './routes/app'
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import ajvErrors from "ajv-errors";

const fastify = Fastify({
    logger: true, // Enables logging
    ajv: {
        customOptions: { allErrors: true },
        plugins: [ajvErrors], // Use ajv-errors plugin for custom messages
    }
})
const JWT_SECRET_TOKEN: any = process.env.JWT_SECRET_TOKEN
// Register JWT plugin
fastify.register(fastifyJwt, {
    secret: JWT_SECRET_TOKEN.toString(), // Change this to a strong secret key
});

// Global Authentication Hook (Runs before every route)
fastify.addHook("preHandler", async (req: any, reply: any) => {
    if (req.url !== "/login" && req.url !== "/add" && req.url !== '/about' && req.url !== '/home') {
        const data = await req.jwtVerify(); // Verify token for protected routes
    }
});
// Global error handler
fastify.setErrorHandler((error: FastifyError, request: any, reply: any) => {
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
fastify.register(cors, {
    origin: "*", // Allow all origins
    methods: ['GET', 'DELETE'], // Allowed HTTP methods

});
fastify.register(routes1, { prefix: "/api/v1" });
// Serve static files from the 'public' folder
fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
    prefix: "/",
});
fastify.get('/about', (req, reply: any) => {
    reply.sendFile('views/about.html');
});
fastify.get('/home', (req, reply: any) => {
    reply.sendFile('views/home.html');
});

// import fastifyIO from 'fastify-socket.io';
// Register Socket.IO plugin
// fastify.register(fastifyIO, {
//     cors: {
//         origin: "*", // Allow all origins (you can restrict it)
//     },
// });

// // Route to serve different HTML files dynamically
// fastify.get("/:page", async (req: any, reply: any) => {
//     const page = req.params.page;
//     // Ensure only allowed HTML files are served
//     const allowedPages = ["index", "index1"];
//     if (allowedPages.includes(page)) {
//         return reply.sendFile(`${page}.html`);
//     }
//     return reply.status(404).send("Page Not Found");
// });

export = fastify;
