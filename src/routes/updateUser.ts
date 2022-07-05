import {  User } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";



const User = Type.Object({
    email: Type.String(),
    password: Type.String(),
    first_name: Type.String(),
    last_name: Type.String(),
    gender: Type.String(),
    role: Type.String(),
    city:Type.String(),
});
const PartialUser = Type.Partial(User);
type PartialUser = Static<typeof PartialUser>;
const tokenHeaders = Type.Object({
    token: Type.String(),
});
type tokenHeaders = Static<typeof tokenHeaders>;

export default async function (server: FastifyInstance) {

    server.route({
		method: 'PATCH',
		url: '/user',
		schema: {
			summary: 'Update user',
			tags: ['user'],
			body: PartialUser,
            headers: tokenHeaders,
		},
		handler: async (request, reply) => {
            const user = request.body as User;
		    const { token } = request.headers as tokenHeaders;
			server.jwt.verify(token,   async function(err, decoded) {
				let a = decoded.id;  
			if(a){
			   return await prismaClient.user.update({
                where: {user_id:a},
                	data: user,
			});}
		}); },
	});}