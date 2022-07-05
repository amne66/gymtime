import fastifyAutoload from '@fastify/autoload';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';
import fastifyjwt from "@fastify/jwt";


export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'Gym Time',
			version: '0.0.1',
		},
	},
});

server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});

server.register(fastifySensible);

server.register(fastifyjwt, {
	secret: 'secret'
  })
export function listen() {
	server
	 .listen({
	  port: 3001	 })
	 .catch((err) => {
	  server.log.error(err);
	  process.exit(1);
	 });
   }