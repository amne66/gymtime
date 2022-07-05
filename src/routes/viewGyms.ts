import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";


const GymParams = Type.Object({
	city: Type.String(),
    gymType: Type.String(),
});
type GymParams = Static<typeof GymParams>;

export default async function (server: FastifyInstance) {

server.route({
    method: 'GET',
    url: '/gym/:city/:gymType',
    schema: {
        summary: 'view gyms in user city',
        tags: ['gym'],
        params: GymParams,       
    },
    handler: async (request, reply) => {
        const a = request.params as GymParams;
		return prismaClient.gym.findMany({
				where: { gymType : a.gymType,
                city:a.city },
			});
    },
});}