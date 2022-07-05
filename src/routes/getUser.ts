import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";

export default async function (server: FastifyInstance) {
    const tokenHeaders = Type.Object({
		token: Type.String(),
	});
	type tokenHeaders = Static<typeof tokenHeaders>;
	server.route({
		method: 'GET',
		url: '/user',
		schema: {
			summary: 'get user ',
			tags: ['user'],
			headers:tokenHeaders,
		},
		handler: async (request, reply) => {
		    const { token } = request.headers as tokenHeaders;
			server.jwt.verify(token,   async function(err, decoded) {
				let a = decoded.id;  
			if(a){
			    const g= await prismaClient.user.findFirst({
				where: { user_id:a},
			});
			console.log(g);
			reply.send(g);}
		}); },
	});}
