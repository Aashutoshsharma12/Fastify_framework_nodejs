
import { StatusCodes } from "http-status-codes";
import auth from "./../../../controllers/common_api/auth";
import { authorizeRoles } from "./../../../utils/authenticate";
import { add_userSchema, getUserSchema, listUserSchema } from "./../../../validators/user";
export default async function authRoute(fastify: any) {
    fastify.post('/addUser', { schema: add_userSchema }, async (req: any, reply: any) => {
        const data = await auth.addUser(req.body, fastify);
        reply.status(StatusCodes.CREATED).send({ data: data, code: StatusCodes.CREATED });
    })
    fastify.get('/getUser/:id', { preHandler: authorizeRoles(['user']), schema: getUserSchema }, async (req: any, reply: any) => {
        const data = await auth.getUser(req.params);
        reply.status(StatusCodes.OK).send({ data: data, code: StatusCodes.OK });
    })
    fastify.get('/list', { preHandler: authorizeRoles(['user']), schema: listUserSchema }, async (req: any, reply: any) => {
        const data = await auth.listUser(req.query);
        reply.status(StatusCodes.OK).send({ data: data, code: StatusCodes.OK });
    })
}