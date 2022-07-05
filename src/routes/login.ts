import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { prismaClient } from "../prisma";
import {User} from '@prisma/client';

export default async function (server: FastifyInstance) {
	const User = Type.Object({
        email: Type.String(),
		password: Type.String(),
	});
    server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'login',
			tags: ['login'],
			body: User,
		},
		handler: async (request, reply) => {
			const user = request.body as User;
			const userInDb = await prismaClient.user.findFirst({where: {email : user.email}});
			  if(!userInDb){
				const newUser = await prismaClient.user.create({
					data: {
						email: user.email,
						password: user.password,
						first_name: '',
						last_name: '',
						gender: '',
						city: '',
						role:''},
				});
				const token = server.jwt.sign({ email: user.email, id: newUser.user_id });
				return {
					token,
					type: 'SignUp',
				};
			   } else{
				if(user.password !== userInDb.password){
					return false;
				}                                    
				const token = server.jwt.sign({ email: user.email, id: userInDb.user_id });
				return {
					token,
					name: userInDb.first_name,
					type: 'SignIn',
				};		 
		        }
			},		
	});
}