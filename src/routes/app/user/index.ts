
import { StatusCodes } from "http-status-codes";
import homeRoute from "./home";
export default async function userRoute(fastify: any) {
    fastify.register(homeRoute, { prefix: '/home' })
}