// import { messages } from "@Custom_message";
import userModel from "../../models/user";
import moment from "moment-timezone";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId
//kskks
async function userList(query: any, userId: any, headers: any): Promise<any> {
    try {
        const userList = await userModel.find();
        return userList;
    } catch (err) {
        throw new Error(err);
    }
};



export default {
    userList
} as const;
