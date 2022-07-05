import { Static, Type } from "@sinclair/typebox";
import { ObjectId } from "bson";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";

const GymParams = Type.Object({
	id: Type.String(),
});
type GymParams = Static<typeof GymParams>;

export default async function (server: FastifyInstance) {

    server.route({
		method: 'DELETE',
		url: '/gym/:id',
		schema: {
			summary: 'Deletes a gym',
			tags: ['gym'],
			params: GymParams,
		},
		handler: async (request, reply) => {
			const { id } = request.params as GymParams;
			return prismaClient.gym.delete({
				where: { id },
			});
		},
	});

}