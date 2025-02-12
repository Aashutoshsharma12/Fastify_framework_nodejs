// import fastify from "./../../server";
import { StatusCodes } from "http-status-codes";
import userModel from "./../../models/user";
import { generateToken } from "./../../utils/authenticate";

async function addUser(body: any, fastify: any): Promise<any> {
    try {
        const add: any = await userModel.create(body);
        const newObj: any = add.toObject()
        // Ensure JWT plugin is registered before using it
        const token = await generateToken(fastify, add._id, add.role)
        newObj.token = token
        if (!token) {
            throw { code: 402, message: "Token is not Generated" };
        }
        return newObj;
    } catch (err) {
        // Default error response
        throw {
            success: false,
            message: err.message || "Internal Server Error",
            statusCode: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
        }
    }
}
function getUser(param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = param;
            const list = await userModel.findById(id);
            resolve(list);
        } catch (err) {
            reject(err);
        }
    })
}
function listUser(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { status } = query;
            const list = await userModel.find({ isActive: status });
            resolve(list);
        } catch (err) {
            reject(err);
        }
    })
}

export default {
    addUser,
    getUser,
    listUser
} as const;