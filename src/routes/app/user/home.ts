
import { StatusCodes } from "http-status-codes";
import home from "./../../../controllers/user/home";
import { authorizeRoles } from "./../../../utils/authenticate";
export default async function homeRoute(fastify: any) {
    fastify.get('/userList', { preHandler: authorizeRoles(['user1', 'user']) }, async (req: any, reply: any) => {
        const data = await home.userList(req.query, req.user.id, req.headers);
        reply.status(StatusCodes.OK).send({ data: data, code: StatusCodes.OK });
    })
}