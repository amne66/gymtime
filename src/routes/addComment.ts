import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";
import {Comment} from '@prisma/client';

export default async function (server: FastifyInstance) {
    const Comment = Type.Object({
        comment: Type.String(),
		gymId: Type.String(),
	});
	const tokenHeaders = Type.Object({
		token: Type.String(),
	});
	type tokenHeaders = Static<typeof tokenHeaders>;
	server.route({
		method: 'POST',
		url: '/comment',
		schema: {
			summary: 'add new comment',
			tags: ['comment'],
			body: Comment,
			headers:tokenHeaders,
		},
		handler: async (request, reply) => {
			const comment = request.body as Comment;
		    const { token } = request.headers as tokenHeaders;
			server.jwt.verify(token,   async function(err, decoded) {
				let a = decoded.id;  
			if(a){
			   return await prismaClient.comment.create({
				data: {
					comment:comment.comment,
					gymId:comment.gymId,
					User_id:a
				},
			});}
		}); },
	});}
