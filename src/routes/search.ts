import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance";
import Fuse from "fuse.js";
import { prismaClient } from "../prisma";
import {Gym} from '@prisma/client';



export default async function (server: FastifyInstance) {
 
const GetGymsQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetGymsQuery = Static<typeof GetGymsQuery>;
server.route({
    method: 'GET',
    url: '/gym',
    schema: {
        summary: 'search for a gym by name or get all gyms',
        tags: ['gym'],
        querystring: GetGymsQuery,
        
    },
    handler: async (request, reply) => {
        const query = request.query as GetGymsQuery;

        const gyms = await prismaClient.gym.findMany();
        if (!query.name) {
        return gyms;}
        const fuse = new Fuse(gyms, {
            includeScore: true,
            isCaseSensitive: false,
            includeMatches: true,
            findAllMatches: true,
            threshold: 1,
            keys: ['name'],
        });
        const result: Gym[] = fuse.search(query.name).map((r) => r.item);
        return result;
    },
});
}