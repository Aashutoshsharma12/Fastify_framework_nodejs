// import fastify from "./../../server";
import userModel from "./../../models/user";
import { generateToken } from "./../../utils/authenticate";

function addUser(body: any, fastify: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const add: any = await userModel.create(body);
            const newObj: any = add.toObject()
            // Ensure JWT plugin is registered before using it
            const token = await generateToken(fastify, add._id, add.role)
            newObj.token = token
            resolve(newObj);
        } catch (err) {
            reject(err);
        }
    })
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