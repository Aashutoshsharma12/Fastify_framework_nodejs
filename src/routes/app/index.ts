import userRoute from "./user";
import commonRoute from './common'

export default async function routes1(fastify: any) {
    fastify.register(userRoute, { prefix: '/user' });
    fastify.register(commonRoute, { prefix: '/common' });
}