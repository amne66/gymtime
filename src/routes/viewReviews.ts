import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";


const GymParams = Type.Object({
	gymId: Type.String(),
});
type GymParams = Static<typeof GymParams>;

export default async function (server: FastifyInstance) {

server.route({
    method: 'GET',
    url: '/gym/reviews/:gymId',
    schema: {
        summary: 'view comments',
        tags: ['comment'],
        params: GymParams,
        
    },
    handler: async (request, reply) => {
        const { gymId } = request.params as GymParams;
		return prismaClient.comment.findMany({
				where: { gymId },
			});
    },
});}