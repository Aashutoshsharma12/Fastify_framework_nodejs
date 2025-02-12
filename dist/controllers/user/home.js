"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { messages } from "../../Custom_message/index";
const user_1 = __importDefault(require("../../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
//kskks
function userList(query, userId, headers) {
    return new Promise(async (resolve, reject) => {
        try {
            const userList = await user_1.default.find();
            resolve(userList);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = {
    userList
};
