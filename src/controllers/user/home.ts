// import { messages } from "@Custom_message";
import userModel from "../../models/user";
import moment from "moment-timezone";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId
//kskks
function userList(query: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const userList = await userModel.find();
            resolve(userList);
        } catch (err) {
            reject(err)
        }
    });
}



export default {
    userList
} as const;
