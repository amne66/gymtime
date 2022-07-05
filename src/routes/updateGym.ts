import { Gym } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";


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
const PartialGym = Type.Partial(Gym);
type PartialGym = Static<typeof PartialGym>;
const GymParams = Type.Object({
	id: Type.String(),
});
type GymParams = Static<typeof GymParams>;

export default async function (server: FastifyInstance) {

    server.route({
		method: 'PATCH',
		url: '/gym/:id',
		schema: {
			summary: 'Update gym',
			tags: ['gym'],
			body: PartialGym,
            params: GymParams,
		},
		handler: async (request, reply) => {
			const gym = request.body as Gym;
			const { id } = request.params as GymParams;
			return prismaClient.gym.update({
				where: {id},
				data: gym,
			});
		},
	});}