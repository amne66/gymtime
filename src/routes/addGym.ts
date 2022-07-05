import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";
import {Gym} from '@prisma/client';


export default async function (server: FastifyInstance) {
    const Gym = Type.Object({
        name: Type.String(),
        rating: Type.String(),
		gymInfo: Type.String(),
		gymType: Type.String(),
		city: Type.String(),
		price: Type.String(),
		twitter:Type.String(),
		websiteLink:Type.String(),
		phoneNumber:Type.String(),
		branch:Type.String(),
	});
	server.route({
		method: 'POST',
		url: '/gym',
		schema: {
			summary: 'add new gym',
			tags: ['gym'],
			body: Gym,
		},
		handler: async (request, reply) => {
			const gym = request.body as Gym;
			return await prismaClient.gym.create({
				data: gym,
			});
		},
	});}