"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fastify from "./../../server";
const http_status_codes_1 = require("http-status-codes");
const user_1 = __importDefault(require("./../../models/user"));
const authenticate_1 = require("./../../utils/authenticate");
async function addUser(body, fastify) {
    try {
        const add = await user_1.default.create(body);
        const newObj = add.toObject();
        // Ensure JWT plugin is registered before using it
        const token = await (0, authenticate_1.generateToken)(fastify, add._id, add.role);
        newObj.token = token;
        if (!token) {
            throw { code: 402, message: "Token is not Generated" };
        }
        return newObj;
    }
    catch (err) {
        // Default error response
        throw {
            success: false,
            message: err.message || "Internal Server Error",
            statusCode: err.code || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        };
    }
}
function getUser(param) {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = param;
            const list = await user_1.default.findById(id);
            resolve(list);
        }
        catch (err) {
            reject(err);
        }
    });
}
function listUser(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const { status } = query;
            const list = await user_1.default.find({ isActive: status });
            resolve(list);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = {
    addUser,
    getUser,
    listUser
};
