"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fastify from "./../../server";
const user_1 = __importDefault(require("./../../models/user"));
const authenticate_1 = require("./../../utils/authenticate");
function addUser(body, fastify) {
    return new Promise(async (resolve, reject) => {
        try {
            const add = await user_1.default.create(body);
            const newObj = add.toObject();
            // Ensure JWT plugin is registered before using it
            const token = await (0, authenticate_1.generateToken)(fastify, add._id, add.role);
            newObj.token = token;
            resolve(newObj);
        }
        catch (err) {
            reject(err);
        }
    });
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
