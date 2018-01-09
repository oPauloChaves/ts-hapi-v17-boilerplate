import * as Hapi from 'hapi'

function IndexRoute({path}) {
  return {
    method: 'GET',
    path,
    options: {
      handler: request => {
        return {username: 'hapi'}
      },
    },
  }
}

async function register(server: Hapi.Server, {api}) {
  server.dependency(['hapi-mongodb-models'])
  const userPath = `${api.basePath}/users`

  server.route([IndexRoute({path: `${userPath}`})])

  server.log('info', 'Plugin registered: api-users')
}

export default {
  plugin: {
    name: 'api-users',
    version: '0.1.0',
    register,
  },
}
