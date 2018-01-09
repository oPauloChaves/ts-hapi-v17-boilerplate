import * as Hapi from 'hapi'
import UserRoutes from './api/users'

async function register(server: Hapi.Server, options) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {message: 'Hello, World!'}
    },
  })

  await server.register([{plugin: UserRoutes, options}])
}

export default {
  plugin: {
    name: 'api-routes',
    version: '1.0.0',
    register,
  },
}
