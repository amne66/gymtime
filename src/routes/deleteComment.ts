import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import { prismaClient } from "../prisma";

const ViewParams = Type.Object({
	comment_id: Type.String(),
});
type ViewParams = Static<typeof ViewParams>;

export default async function (server: FastifyInstance) {

    server.route({
		method: 'DELETE',
		url: '/comment/:comment_id',
		schema: {
			summary: 'Delete comment',
			tags: ['comment'],
			params: ViewParams,
		},
		handler: async (request, reply) => {
			const { comment_id } = request.params as ViewParams;
			return prismaClient.comment.delete({
				where: {comment_id},
			});
		},
	});

}