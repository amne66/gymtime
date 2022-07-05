import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";


const GymParams = Type.Object({
	id: Type.String(),
});
type GymParams = Static<typeof GymParams>;

export default async function (server: FastifyInstance) {

server.route({
    method: 'GET',
    url: '/gym/details/:id',
    schema: {
        summary: 'view gyms',
        tags: ['gym'],
        params: GymParams,
       
    },
    handler: async (request, reply) => {
        const { id } = request.params as GymParams;
		return prismaClient.gym.findMany({
				where: { id },
			});
    },
});}