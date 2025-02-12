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
async function userList(query, userId, headers) {
    try {
        const userList = await user_1.default.find();
        return userList;
    }
    catch (err) {
        throw new Error(err);
    }
}
;
exports.default = {
    userList
};
